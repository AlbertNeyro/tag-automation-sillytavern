# Tag Automation for SillyTavern

An AI-powered SillyTavern UI extension for suggesting character tags and cleaning selected creator metadata.

## Features

- Analyze a character's name, description, personality, scenario, first message, example messages, and prompt fields with an LLM.
- Uses SillyTavern's currently active Main API connection through its built-in `generateRaw()` function.
- Automatically follows the active API configuration, including the currently selected Connection Profile. Switch profiles in **API Connections** before running an analysis.
- No separate API key, provider URL, or model configuration is stored by this extension.
- Configure the maximum number of suggested tags (1–50) and optional custom instructions.
- Review AI suggestions as checkboxes, select all suggestions, and apply selected tags without duplicating existing tags.
- Remove all tags from the selected character.
- Remove embedded card tags, character version, and/or creator notes.
- Preserve the creator name when cleaning metadata.

## Installation

In SillyTavern, open **Extensions → Download Extensions & Assets → Install extension**, then enter:

```
https://github.com/AlbertNeyro/tag-automation-sillytavern
```

Alternatively, clone this repository into:

```
SillyTavern/data/<user>/extensions/tag-automation-sillytavern
```

Refresh SillyTavern. Open the Extensions panel and use **Tag Automation**.

## AI setup and usage

1. Configure and connect your preferred model in **API Connections** (Main API).
2. If you use Connection Profiles, select the profile you want the extension to use in **API Connections**. The extension uses the active profile; it does not switch profiles itself.
3. Open **Extensions → Tag Automation**.
4. Set the maximum number of tags and optional extra instructions.
5. Select/open a character and click **Analyze current character with AI**.
6. Review the returned tags and check or uncheck individual suggestions.
7. Click **Apply selected tags**, or **Select all suggestions** first.

Tag analysis is sent to whichever model is currently active in SillyTavern. Your provider's normal API usage, latency, and billing apply. The extension does not make a separate direct request to a provider.

## Tag and metadata management

- Applying suggestions merges them with the character's existing top-level tag list.
- Use **Remove all tags** to clear the character's top-level tags.
- Under Creator metadata cleanup, choose the fields to clear and click **Remove selected metadata**.
- Metadata cleanup targets the embedded card fields `data.tags`, `data.character_version`, and `data.creator_notes`. The creator field (`data.creator`) is not changed.
- The extension asks for confirmation before destructive actions. Keep a backup of character cards before bulk or destructive edits.

## Compatibility notes

- AI analysis requires a connected Main API that supports text generation through SillyTavern's `generateRaw()` function.
- Connection Profiles are used by selecting the desired profile as the active connection in SillyTavern. The extension does not maintain separate API credentials.
- The model is instructed to return JSON. The extension validates and cleans the returned tag list before showing it, but model output can still vary.

## License

MIT. See [LICENSE](LICENSE).
