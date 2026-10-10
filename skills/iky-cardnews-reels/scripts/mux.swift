// Muxes an AAC audio file into an MP4 without re-encoding the video.
// Usage: swift mux.swift <video.mp4> <audio.m4a> <out.mp4>
import AVFoundation
let args = CommandLine.arguments
guard args.count >= 4 else { print("usage: swift mux.swift <video.mp4> <audio.m4a> <out.mp4>"); exit(2) }
let out = URL(fileURLWithPath: args[3])
try? FileManager.default.removeItem(at: out)
let video = AVURLAsset(url: URL(fileURLWithPath: args[1])), audio = AVURLAsset(url: URL(fileURLWithPath: args[2]))
func sync<T>(_ body: @escaping () async throws -> T) -> T {
  var result: Result<T, Error>!; let sem = DispatchSemaphore(value: 0)
  Task { do { result = .success(try await body()) } catch { result = .failure(error) }; sem.signal() }
  sem.wait(); return try! result.get()
}
let comp = AVMutableComposition()
let duration = sync { try await video.load(.duration) }
let range = CMTimeRange(start: .zero, duration: duration)
let vTrack = sync { try await video.loadTracks(withMediaType: .video).first! }
let aTrack = sync { try await audio.loadTracks(withMediaType: .audio).first! }
let aDur = sync { try await audio.load(.duration) }
let cv = comp.addMutableTrack(withMediaType: .video, preferredTrackID: kCMPersistentTrackID_Invalid)!
try cv.insertTimeRange(range, of: vTrack, at: .zero)
cv.preferredTransform = sync { try await vTrack.load(.preferredTransform) }
let ca = comp.addMutableTrack(withMediaType: .audio, preferredTrackID: kCMPersistentTrackID_Invalid)!
try ca.insertTimeRange(CMTimeRange(start: .zero, duration: CMTimeMinimum(duration, aDur)), of: aTrack, at: .zero)
guard let session = AVAssetExportSession(asset: comp, presetName: AVAssetExportPresetPassthrough) else { print("no export session"); exit(1) }
session.outputURL = out; session.outputFileType = .mp4
sync { await session.export() }
let res = AVURLAsset(url: out)
let d = sync { try await res.load(.duration) }
let v = sync { try await res.loadTracks(withMediaType: .video).count }, a = sync { try await res.loadTracks(withMediaType: .audio).count }
print("status \(session.status.rawValue) (3 = completed) error \(String(describing: session.error)) duration \(String(format: "%.3f", d.seconds)) s video tracks \(v) audio tracks \(a)")
