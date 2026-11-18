# Tag Automation for SillyTavern

AI-powered batch tagging, character writing, and creator-metadata cleanup for SillyTavern character cards.

## Features
- Select multiple characters with library search and select-visible controls.
- Analyze selected cards sequentially using SillyTavern's active Main API and Connection Profile.
- Review tag suggestions per character; existing tags are preselected.
- Apply checked suggestions to selected cards, without duplicates; remove all top-level tags in bulk.
- Clear embedded tags, character version, and creator notes in bulk while preserving creator name.
- Generate character-specific creator notes using a fixed HTML design, plus revised descriptions and personality summaries.
- Edit generation prompts, edit generated text/HTML, and preview creator-note HTML in a sandboxed viewer.
- Preview existing saved creator notes without changing them.
- Every generated field starts unapproved. Only individually checked fields are saved when Save approved changes is clicked.
- Inline progress and errors; no popups, toast notifications, or confirmation dialogs.

## Installation
In SillyTavern, open Extensions → Download Extensions & Assets → Install extension, then enter:

https://github.com/AlbertNeyro/tag-automation-sillytavern

Alternatively clone into SillyTavern/data/<user>/extensions/tag-automation-sillytavern and refresh.

## Usage
1. Configure a connected Main API model in API Connections and activate the desired Connection Profile.
2. Select characters in Tag Automation. Search filters the library; Select visible selects filtered results.
3. Use AI tag suggestions for tags, or Character content studio for creator notes, descriptions, and personality summaries.
4. Edit prompts under Edit generation prompts. The {character_name} and {character_card} placeholders are supported.
5. Review generated text, edit it if needed, and check the approval box beside each field you want saved.
6. Click Save approved changes. Unchecked fields remain untouched.
7. Use Preview existing creator notes to inspect currently saved notes in an isolated HTML viewer.

## Creator note layout
The generated creator note follows the supplied dark gradient card design, including centered character name and subtitle, character image, divider, appearance paragraph, behavior paragraph, emphasized tagline, and closing divider. Text is HTML-escaped before insertion into the template.

## Metadata behavior
The cleanup action can clear data.tags, data.character_version, and/or data.creator_notes. It never changes data.creator. Destructive bulk actions do not show confirmation dialogs; verify selected characters and fields before running them.

## Notes
AI generation requires SillyTavern generateRaw() support and a connected Main API. The extension stores no separate API credentials. Back up character cards before destructive bulk operations.

## License
MIT. See LICENSE.