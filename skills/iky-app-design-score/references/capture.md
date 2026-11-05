# Capturing screens without taking over the user's screen

## iOS physical device (Xcode Device Hub / CoreDevice)

Device Hub's command-line surface is `devicectl` (`xcrun devicectl help`). It can do these with no window focus:

```sh
xcrun devicectl list devices                                   # name, UDID, state
xcrun devicectl device info apps --device <udid> --json-output -   # lists developer-installed apps only
xcrun devicectl device process launch --device <udid> --terminate-existing <bundle-id>
xcrun devicectl device process openURL --device <udid> "<scheme>://<route>"
xcrun devicectl device capture screenshot --device <udid> --destination out.png
xcrun devicectl device capture screen-record ...               # motion evidence
xcrun devicectl device settings appearance ...                 # light/dark (ask first, restore after)
xcrun devicectl device simulate statusBar|location ...
```

Minimal loop (zsh):

```sh
shot() {  # shot <name> <route>
  xcrun devicectl device process openURL --device "$D" "$SCHEME://$2" >/dev/null 2>&1
  python3 -c "import time; time.sleep(3.5)"      # foreground sleep may be blocked; wait for render
  xcrun devicectl device capture screenshot --device "$D" --destination "$OUT/$1.png" >/dev/null 2>&1 \
    && sips -Z 1400 "$OUT/$1.png" >/dev/null && echo "ok $1"
}
```

Facts learned the hard way:
- `devicectl` has **no tap or swipe**. Taps need the mirrored window (Device Hub "View Screen"), a UI-test runner (XCUITest/WebDriverAgent) or a tool such as Maestro, which needs installing (ask first).
- Background clicks into Device Hub's mirrored screen are unreliable. Some land late and some never arrive. Foreground clicks work, but they take over the user's screen and pointer, so ask first. Mirror screenshots are scaled differently from window points, so recompute coordinates from every capture.
- App Store and TestFlight installs do not appear in `device info apps`. Get the bundle id from the app config (for example `ios.bundleIdentifier` or the env var it reads).
- A modal or bottom sheet opened on one route can stay on top of every route you deep-link to next. Check captures and relaunch to clear it.
- Device Hub's mirroring adds an indicator pill to the status bar. Tell lens agents to ignore it.

## iOS simulator

`xcrun simctl io <udid> screenshot out.png`, `xcrun simctl openurl <udid> <url>`, `xcrun simctl ui <udid> appearance dark|light`. Simulator results do not prove device-only behavior (safe areas on a notch device, performance, push).

## Web

Use the session's browser tool. Capture 390×844 and 1440×900 at minimum, after fonts and images load.
