# Tag Automation for SillyTavern

A lightweight, local-only SillyTavern UI extension for suggesting character tags from card text and cleaning selected creator metadata.

## Features

- Analyze a character's name, description, personality, scenario, first message, example messages, and prompt fields.
- Suggest tags using a transparent keyword/rule matcher. No external API, model call, or network service is required.
- Review suggestions as checkboxes, select all suggestions, and apply selected tags without duplicating existing tags.
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

## Usage

1. Select/open a character.
2. Click **Analyze current character**.
3. Review the suggested tags and check or uncheck individual suggestions.
4. Click **Apply selected tags**, or **Select all suggestions** first.
5. Use **Remove all tags** to clear the character's tags.
6. Under Creator metadata cleanup, choose the fields to clear and click **Remove selected metadata**.

Metadata cleanup targets the embedded card fields `data.tags`, `data.character_version`, and `data.creator_notes`. The creator field (`data.creator`) is not changed.

## Notes

- Tag suggestions are heuristic, not semantic AI classification. A tag is suggested when its matching keywords occur in the character card text.
- Applying suggestions merges them with the character's existing top-level tag list.
- The extension asks for confirmation before destructive actions.
- Always keep a backup of character cards before bulk or destructive edits.

## License

MIT. See [LICENSE](LICENSE).
