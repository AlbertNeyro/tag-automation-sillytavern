# Tag Automation for SillyTavern

AI-powered batch tagging and creator-metadata cleanup for SillyTavern character cards.

## Features
- Select multiple characters with library search and select-visible controls.
- Analyze selected cards sequentially using SillyTavern's active Main API and Connection Profile.
- Review tag suggestions per character; existing tags are preselected.
- Apply checked suggestions to all selected cards, without duplicates.
- Remove all top-level tags from selected cards.
- Clear embedded tags, character version, and creator notes in bulk while preserving creator name.
- Inline progress and errors; no popups, toast notifications, or confirmation dialogs.
- Configure maximum tags (1–50) and additional AI instructions.

## Installation
In SillyTavern, open Extensions → Download Extensions & Assets → Install extension, then enter:

https://github.com/AlbertNeyro/tag-automation-sillytavern

Alternatively clone into SillyTavern/data/<user>/extensions/tag-automation-sillytavern and refresh.

## Usage
1. Configure a connected Main API model in API Connections and activate the desired Connection Profile.
2. Open Tag Automation and select characters. Search filters the library; Select visible selects the filtered results.
3. Analyze selected characters. Requests run sequentially.
4. Review each card's suggestions and uncheck any tags you do not want.
5. Apply selected tags, remove all tags, or choose metadata fields to clean.

## Metadata behavior
The cleanup action clears data.tags, data.character_version, and/or data.creator_notes. It never changes data.creator. Destructive bulk actions have no confirmation dialog; verify the selection before running them.

## Notes
AI analysis requires SillyTavern's generateRaw() support and a connected Main API. The extension stores no separate API credentials. Back up character cards before destructive bulk operations.

## License
MIT. See LICENSE.