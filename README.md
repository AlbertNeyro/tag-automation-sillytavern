# Tag Automation for SillyTavern

AI-powered batch tagging, character writing, and creator-metadata cleanup for SillyTavern character cards.

## Features
- Select multiple characters with library search and select-visible controls.
- Analyze selected cards sequentially using SillyTavern's active Main API and Connection Profile.
- Review tag suggestions per character; existing tags are preselected.
- Apply checked suggestions to selected cards, without duplicates; remove all top-level tags in bulk.
- Clear embedded tags, character version, and creator notes in bulk while preserving creator name.
- Creator-note HTML now embeds the existing creator notes verbatim (no AI-generated filler or invented sections), while AI selects only the accent color. Character descriptions are copy-edited using only the existing description as source. Personality summaries are based on the existing description.
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
Creator notes use the compact dark gradient HTML layout, centered name and subtitle, character artwork, paragraphs, and a closing tagline. The AI-selected accent color customizes the border and title/tagline color. The existing creator-note text is preserved verbatim in the HTML rather than rewritten or expanded. The image first attempts characters/[character name].[avatar extension], then falls back to the card's actual avatar filename. Images are loaded from the local SillyTavern characters directory; the extension does not search the internet or load remote images. Generated text is HTML-escaped before insertion into the template. Creator-note generation requires existing data.creator_notes; description revision requires an existing description. Each output is revised from its corresponding existing text rather than generated from unrelated card fields.

## Metadata behavior
The cleanup action can clear data.tags, data.character_version, and/or data.creator_notes. It never changes data.creator. Destructive bulk actions do not show confirmation dialogs; verify selected characters and fields before running them.

## Notes
AI generation requires SillyTavern generateRaw() support and a connected Main API. The extension stores no separate API credentials. No web search, remote image lookup, or other optional online feature is enabled or performed by the extension; AI requests still use the Main API configured by the user. Back up character cards before destructive bulk operations.

## License
MIT. See LICENSE.