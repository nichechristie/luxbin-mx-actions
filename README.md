# Luxbin MX Actions

> Turn your Logitech MX Creative Console into a physical AI command center!

![Luxbin MX Actions](assets/key-layout.png)

Instead of navigating menus or typing prompts, creative developers map real buttons and dials to AI-powered actions -- refactor code with one press, control AI creativity by turning the dial, or cycle through workflow presets with the Actions Ring.

Built on the **Logitech Actions SDK**, this plugin registers custom actions that bridge physical input to intelligent software behavior. The result: a tactile, zero-friction interface for the workflows creators repeat hundreds of times a day.

## Features

- **One-press AI refactoring** -- Creative Console Key 1 triggers instant code cleanup
- **Dial-controlled AI temperature** -- Turn the dial to adjust AI creativity from conservative (0.0) to experimental (1.0) in real time
- **Summarize anything** -- Key 2 generates a concise summary of your current file
- **Workflow preset cycling** -- Actions Ring switches between Code, Design, and Deploy modes
- **Visual overlay** -- Always-visible status showing current mode, temperature, and last action result

## How It Works

| Hardware Input | Action | What Happens |
|---|---|---|
| Creative Console Key 1 | Refactor | AI cleans up and improves your code |
| Creative Console Key 2 | Summarize | AI summarizes the current file |
| Creative Console Key 3 | Preview Build | Triggers a build/deploy preview |
| Creative Console Dial | Temperature | Adjusts AI creativity 0.0 - 1.0 |
| MX Master Actions Ring | Mode Switch | Cycles: Code / Design / Deploy |

## Demo

> *Turn the dial. Watch the AI change.*

The core demo shows the dial-to-temperature-to-visible-output loop:
1. Turn the MX Creative Console dial
2. Temperature value updates in the overlay (0.2 -> 0.5 -> 0.9)
3. AI output text visibly shifts from conservative to creative

## Getting Started

### Prerequisites
- [Logitech Options+](https://www.logitech.com/software/options-plus.html) installed
- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- MX Creative Console or compatible Loupedeck device

### Build & Run
```bash
dotnet build
```

The plugin registers automatically with Options+ via the `.link` file. Open Options+ to assign actions to your device buttons and dial.

## Project Structure

```
luxbin-mx-actions/
├── README.md
├── LoupedeckPackage.yaml          # Plugin manifest
├── src/
│   ├── LuxbinPlugin.cs            # Plugin entry point
│   ├── Actions/
│   │   ├── RefactorCommand.cs     # Key 1: AI refactor
│   │   ├── SummarizeCommand.cs    # Key 2: AI summarize
│   │   ├── PreviewBuildCommand.cs # Key 3: Build preview
│   │   └── TemperatureAdjustment.cs # Dial: AI temperature
│   └── Services/
│       └── AiService.cs           # AI integration layer
├── overlay/
│   └── index.html                 # Visual status overlay
└── assets/
    └── key-layout.png             # Button mapping diagram
```

## Built With

- [Logitech Actions SDK](https://logitech.github.io/actions-sdk-docs/) (C# / .NET 8)
- OpenAI API (for AI actions)
- MX Creative Console hardware

## Author

**Nichole Christie** -- [@nichechristie](https://github.com/nichechristie)

## License

MIT
