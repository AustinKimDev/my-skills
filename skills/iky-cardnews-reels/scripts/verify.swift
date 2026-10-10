// Reads back the encoded MP4: prints track metadata and decodes stills at the given seconds.
// Usage: swift verify.swift <video.mp4> <outDir> 4.8 8.5 ...
import AVFoundation
import AppKit
let a = CommandLine.arguments
let asset = AVURLAsset(url: URL(fileURLWithPath: a[1]))
let track = asset.tracks(withMediaType: .video)[0]
let codec = CMFormatDescriptionGetMediaSubType(track.formatDescriptions[0] as! CMFormatDescription)
let fourcc = String(bytes: [24, 16, 8, 0].map { UInt8((codec >> $0) & 255) }, encoding: .ascii)!
print("duration=\(CMTimeGetSeconds(asset.duration)) size=\(track.naturalSize) fps=\(track.nominalFrameRate) codec=\(fourcc) bitrate=\(Int(track.estimatedDataRate)) audioTracks=\(asset.tracks(withMediaType: .audio).count)")
let gen = AVAssetImageGenerator(asset: asset)
gen.requestedTimeToleranceBefore = .zero; gen.requestedTimeToleranceAfter = .zero
for s in a.dropFirst(3) {
  let cg = try gen.copyCGImage(at: CMTime(seconds: Double(s)!, preferredTimescale: 600), actualTime: nil)
  try NSBitmapImageRep(cgImage: cg).representation(using: .png, properties: [:])!.write(to: URL(fileURLWithPath: "\(a[2])/mp4-\(s).png"))
}
