(() => {
    'use strict';

    const MODULE = 'tag_automation_sillytavern';
    const ROOT_ID = 'tag-automation-panel';
    const TAG_RULES = [
        ['romance', /\b(romance|romantic|lover|dating|boyfriend|girlfriend|husband|wife|marriage|courtship)\b/i],
        ['comedy', /\b(comedy|comed(y|ic)|funny|humou?r|hilarious|parody|satire)\b/i],
        ['drama', /\b(drama|dramatic|tragedy|angst|heartbreak|emotional)\b/i],
        ['horror', /\b(horror|terrifying|nightmare|haunt(ed|ing)?|eldritch|恐怖)\b/i],
        ['fantasy', /\b(fantasy|magic(al)?|wizard|witch|sorcer(er|ess)|dragon|elf|demon|fairy)\b/i],
        ['science fiction', /\b(sci[- ]?fi|science fiction|cyberpunk|space(ship|farer)?|alien|android|robot|dystopia)\b/i],
        ['modern', /\b(modern|contemporary|present[- ]day|urban|city)\b/i],
        ['historical', /\b(historical|medieval|victorian|ancient|renaissance|samurai|feudal)\b/i],
        ['slice of life', /\b(slice of life|everyday life|daily routine|roommate|school life|workplace)\b/i],
        ['adventure', /\b(adventure|quest|journey|explor(er|ation)|travel|expedition)\b/i],
        ['action', /\b(action|fight(er|ing)?|combat|battle|warrior|assassin|mercenary)\b/i],
        ['mystery', /\b(mystery|detective|investigat(e|ion)|crime|murder|whodunit)\b/i],
        ['roleplay', /\b(roleplay|role[- ]?play|you are|your character|interact with|scenario)\b/i],
        ['female', /\b(she|her|woman|girl|female|lady|daughter|sister|mother)\b/i],
        ['male', /\b(he|him|his|man|boy|male|gentleman|son|brother|father)\b/i],
        ['non-human', /\b(non[- ]human|monster|creature|beast|dragon|demon|angel|alien|anthropomorphic|furry)\b/i],
        ['introvert', /\b(introvert(ed)?|shy|reserved|withdrawn|quiet|socially anxious)\b/i],
        ['extrovert', /\b(extrovert(ed)?|outgoing|sociable|charismatic|gregarious)\b/i],
        ['tsundere', /\b(tsundere|acts? cold|hides? (her|his|their) feelings)\b/i],
        ['yandere', /\b(yandere|obsessive|possessive|jealous|obsession)\b/i],
        ['dominant', /\b(dominant|assertive|commanding|controlling|authoritative)\b/i],
        ['submissive', /\b(submissive|obedient|meek|compliant|deferential)\b/i],
        ['gentle', /\b(gentle|kind|caring|compassionate|tender|soft[- ]hearted)\b/i],
        ['sarcastic', /\b(sarcastic|snarky|witty|dry humour|dry humor|cynical)\b/i],
        ['intelligent', /\b(intelligent|brilliant|genius|scholar|scientist|strategist|analytical)\b/i],
        ['mysterious', /\b(mysterious|enigmatic|secretive|cryptic|秘密)\b/i],
        ['villain', /\b(villain|antagonist|evil|cruel|ruthless|tyrant)\b/i],
        ['hero', /\b(hero|heroic|protagonist|protector|saviour|savior)\b/i],
        ['mentor', /\b(mentor|teacher|instructor|guide|master)\b/i],
        ['companion', /\b(companion|partner|friend|ally|sidekick)\b/i],
        ['student', /\b(student|pupil|classmate|schoolgirl|schoolboy|college)\b/i],
        ['supernatural', /\b(supernatural|ghost|spirit|vampire|werewolf|undead|immortal)\b/i],
        ['military', /\b(military|soldier|captain|commander|army|navy|mercenary)\b/i],
        [' royalty', /\b(prince(ss)?|king|queen|royal|noble|duke|emperor|empress)\b/i],
    ];

    function getContext() {
        return window.SillyTavern?.getContext?.();
    }

    function currentCharacter() {
        const ctx = getContext();
        return ctx?.characterId !== undefined ? ctx.characters?.[ctx.characterId] : null;
    }

    function cardData(character) {
        return character?.data ?? character ?? {};
    }

    function collectText(character) {
        const data = cardData(character);
        return [
            character?.name, data?.name, data?.description, data?.personality,
            data?.scenario, data?.first_mes, data?.mes_example,
            data?.creator_notes, data?.system_prompt, data?.post_history_instructions,
        ].filter(value => typeof value === 'string').join('\n');
    }

    function suggestTags(text) {
        const found = [];
        for (const [tag, pattern] of TAG_RULES) {
            if (pattern.test(text) && !found.includes(tag.trim())) found.push(tag.trim());
        }
        return found;
    }

    function notify(message, type = 'info') {
        const toast = window.toastr;
        if (toast?.[type]) toast[type](message);
        else console.info('[Tag Automation]', message);
    }

    async function updateCharacter(fields) {
        const ctx = getContext();
        const character = currentCharacter();
        if (!ctx || !character?.avatar) throw new Error('Select a character first.');

        const response = await fetch('/api/characters/merge-attributes', {
            method: 'POST',
            headers: ctx.getRequestHeaders(),
            body: JSON.stringify({ avatar: character.avatar, ...fields }),
        });
        if (!response.ok) {
            const detail = await response.text();
            throw new Error(detail || `Character update failed (${response.status}).`);
        }
        await ctx.getOneCharacter(character.avatar);
        const refreshed = currentCharacter();
        if (ctx.eventSource && ctx.eventTypes?.CHARACTER_EDITED) {
            await ctx.eventSource.emit(ctx.eventTypes.CHARACTER_EDITED, {
                detail: { id: ctx.characterId, character: refreshed },
            });
        }
        return refreshed;
    }

    function create(tag, className, label) {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (label !== undefined) element.textContent = label;
        return element;
    }

    function renderSuggestions(container, suggestions, existingTags) {
        container.replaceChildren();
        if (!suggestions.length) {
            container.append(create('p', 'ta-muted', 'No confident matches found. Try a longer description.'));
            return;
        }
        for (const tag of suggestions) {
            const label = create('label', 'ta-tag-option');
            const checkbox = create('input');
            checkbox.type = 'checkbox';
            checkbox.value = tag;
            checkbox.checked = existingTags.some(item => item.toLowerCase() === tag.toLowerCase());
            label.append(checkbox, document.createTextNode(tag));
            container.append(label);
        }
    }

    function buildPanel() {
        const host = document.querySelector('#extensions_settings') || document.querySelector('#extensions_settings2');
        if (!host || document.getElementById(ROOT_ID)) return;
        const panel = create('section', 'ta-panel');
        panel.id = ROOT_ID;

        const heading = create('h3', '', 'Tag Automation');
        const intro = create('p', 'ta-muted', 'Analyze the selected character card and manage its tags and creator metadata.');
        const analyze = create('button', 'menu_button', 'Analyze current character');
        analyze.type = 'button';
        const status = create('p', 'ta-status', 'Select a character, then analyze its description.');
        const suggestionTitle = create('h4', '', 'Suggested tags');
        const suggestions = create('div', 'ta-suggestions');
        const apply = create('button', 'menu_button', 'Apply selected tags');
        const selectAll = create('button', 'menu_button', 'Select all suggestions');
        const clearTags = create('button', 'menu_button', 'Remove all tags');
        const metadataTitle = create('h4', '', 'Creator metadata cleanup');
        const metadataHelp = create('p', 'ta-muted', 'Removes embedded tags, character version, and creator notes. The creator name is deliberately preserved.');
        const removeMetadata = create('button', 'menu_button', 'Remove selected metadata');
        const metadataChecks = create('div', 'ta-metadata');
        const metadataFields = [
            ['embeddedTags', 'Embedded tags (tags to embed)'],
            ['characterVersion', 'Character version'],
            ['creatorNotes', "Creator's notes"],
        ];
        for (const [value, text] of metadataFields) {
            const label = create('label', 'ta-check-option');
            const input = create('input');
            input.type = 'checkbox';
            input.value = value;
            input.checked = true;
            label.append(input, document.createTextNode(text));
            metadataChecks.append(label);
        }

        const row1 = create('div', 'ta-actions');
        row1.append(apply, selectAll, clearTags);
        panel.append(heading, intro, analyze, status, suggestionTitle, suggestions, row1, metadataTitle, metadataHelp, metadataChecks, removeMetadata);
        host.append(panel);

        let currentSuggestions = [];
        analyze.addEventListener('click', () => {
            const character = currentCharacter();
            if (!character) {
                status.textContent = 'No character selected. Open a character chat first.';
                return;
            }
            currentSuggestions = suggestTags(collectText(character));
            const tags = Array.isArray(character.tags) ? character.tags : [];
            renderSuggestions(suggestions, currentSuggestions, tags);
            status.textContent = `Analyzed “${character.name || cardData(character).name || 'character'}”: ${currentSuggestions.length} suggestion(s).`;
        });

        selectAll.addEventListener('click', () => {
            suggestions.querySelectorAll('input[type="checkbox"]').forEach(input => input.checked = true);
        });

        apply.addEventListener('click', async () => {
            const character = currentCharacter();
            if (!character) return notify('Select a character first.', 'warning');
            const selected = [...suggestions.querySelectorAll('input[type="checkbox"]:checked')].map(input => input.value);
            const existing = Array.isArray(character.tags) ? character.tags : [];
            const merged = [...existing];
            for (const tag of selected) {
                if (!merged.some(item => item.toLowerCase() === tag.toLowerCase())) merged.push(tag);
            }
            try {
                await updateCharacter({ tags: merged });
                notify(`Applied ${selected.length} selected suggestion(s).`, 'success');
            } catch (error) {
                console.error(error);
                notify(error.message, 'error');
            }
        });

        clearTags.addEventListener('click', async () => {
            if (!currentCharacter()) return notify('Select a character first.', 'warning');
            if (!window.confirm('Remove every tag from this character card?')) return;
            try {
                await updateCharacter({ tags: [] });
                currentSuggestions = suggestTags(collectText(currentCharacter()));
                renderSuggestions(suggestions, currentSuggestions, []);
                notify('All character tags removed.', 'success');
            } catch (error) {
                console.error(error);
                notify(error.message, 'error');
            }
        });

        removeMetadata.addEventListener('click', async () => {
            const selected = [...metadataChecks.querySelectorAll('input:checked')].map(input => input.value);
            if (!selected.length) return notify('Choose at least one metadata field.', 'warning');
            if (!currentCharacter()) return notify('Select a character first.', 'warning');
            const data = {};
            if (selected.includes('embeddedTags')) data.tags = [];
            if (selected.includes('characterVersion')) data.character_version = '';
            if (selected.includes('creatorNotes')) data.creator_notes = '';
            if (!window.confirm('Remove the selected creator metadata? The creator name will be kept.')) return;
            try {
                await updateCharacter({ data });
                notify('Selected creator metadata removed. Creator name preserved.', 'success');
            } catch (error) {
                console.error(error);
                notify(error.message, 'error');
            }
        });
    }

    function init() {
        buildPanel();
        const observer = new MutationObserver(() => buildPanel());
        observer.observe(document.body, { childList: true, subtree: true });
        const ctx = getContext();
        if (ctx?.eventSource && ctx?.eventTypes?.APP_READY) {
            ctx.eventSource.on(ctx.eventTypes.APP_READY, buildPanel);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init, { once: true });
    } else {
        init();
    }
})();
