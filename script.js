// === Тема ===
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
let currentTheme = savedTheme || (prefersDark ? 'dark' : 'light');

function applyTheme(theme) {
    if (theme === 'dark') {
        body.classList.add('dark-theme');
        themeToggle.textContent = '🌙';
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.remove('dark-theme');
        themeToggle.textContent = '🌞';
        localStorage.setItem('theme', 'light');
    }
}
applyTheme(currentTheme);
themeToggle.addEventListener('click', () => {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(currentTheme);
});
if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) applyTheme(e.matches ? 'dark' : 'light');
    });
}

// === Вспомогательные функции ===
function shuffleArrayInPlace(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}
function shuffleArray(arr) {
    const copy = [...arr];
    shuffleArrayInPlace(copy);
    return copy;
}

function getAdjustedTeamsCount(availableCount, requested) {
    if (availableCount <= 1) return 1;
    if (availableCount === 2) return 1;
    if (availableCount === 3) return Math.min(requested, 2);
    return Math.min(requested, Math.floor(availableCount / 2));
}

function balanceTeams(teams) {
    teams = teams.filter(team => team.length > 0);
    let changed;
    do {
        changed = false;
        const sizes = teams.map(t => t.length);
        const maxIdx = sizes.indexOf(Math.max(...sizes));
        const minIdx = sizes.indexOf(Math.min(...sizes));
        if (teams[maxIdx].length >= 3 && teams[minIdx].length <= 1) {
            const person = teams[maxIdx].pop();
            teams[minIdx].push(person);
            changed = true;
        }
    } while (changed);
    return teams;
}

function getRandomMinTeamIndex(teams) {
    const minLength = Math.min(...teams.map(t => t.length));
    const minIndices = teams.map((t, i) => t.length === minLength ? i : -1).filter(i => i !== -1);
    return minIndices[Math.floor(Math.random() * minIndices.length)];
}

// === Данные ===
const FIXED_PAIR_GEO = ['Г Ярослав О', 'Г Ксения А'];

const SUBJECTS_DATA = {
    geo: {
        name: 'География',
        people: [
            'А Альфина А', 'А Милана А', 'А Ева Э', 'А Алексей А', 'Б Дмитрий Д',
            'В Мирра П', 'Г Ярослав О', 'Г Ксения А', 'Д Иван Д', 'Д Надежда И',
            'Ж Лаврентий А', 'З Валерия А', 'К Андрей Н', 'Филип О К', 'К Ярослав Д',
            'Л Дарья И', 'М Анастасия С', 'О Павел И', 'С Александр Ю', 'С Даниил С',
            'С Роман С', 'С Федор М', 'Ю Дарья И', 'Я Матвей В'
        ],
        fixedPairs: []
    },
    alg: {
        name: 'Алгебра',
        people: [
            'Лёша', 'Ярослав Г.', 'Ксюша', 'Ваня', 'Ярослав К.',
            'Богдан', 'Настя', 'Костя', 'Даня', 'Рома', 'Федя', 'Вова',
            'Ярослав Ш.', 'Матвей'
        ],
        fixedPairs: [['Ярослав Г.', 'Ксюша']]
    },
    eng: {
        name: 'Английский язык',
        people: [
            'А Аксинья С', 'Г Ярослав О', 'Д Александра Е', 'З Валерия А',
            'Н Анна А', 'П Алексей А', 'П Иван А', 'Ф Варвара С', 'Ф Эмин Д', 'Ч Платон М'
        ],
        fixedPairs: []
    },
    inf: {
        name: 'Информатика',
        people: [
            'Дмитрий', 'Анастасия', 'Дарья', 'Ярослав Г',
            'Константин', 'Андрей', 'Федор', 'Матвей',
            'Иван', 'Ярослав К', 'Ярослав Ш', 'Роман', 'Владимир'
        ],
        fixedPairs: []
    },
    lit: {
        name: 'Литература',
        people: [
            'Аксинья С', 'Ярослав О', 'Ксения А', 'Анастасия', 'Иван Д',
            'Лаврентий А', 'Валерия А', 'Денис О', 'Дэвид Эштон', 'Елизавета А',
            'Анастасия М.', 'Евгения В', 'Любовь А', 'Анна А', 'Виктория О',
            'Ольга Б', 'София И', 'Василиса Н', 'Александр Ю', 'Гай Н',
            'Софья П', 'Мария А', 'Дарья И'
        ],
        fixedPairs: [['Г Ярослав О', 'Г Ксения А']]
    },
    soc: {
        name: 'Обществознание',
        people: [
            'Г Ярослав О', 'Г Ксения А', 'Г Анастасия И', 'Г Марина В',
            'Д Александра Е', 'З Валерия А', 'И Дэвид Эштон', 'К Елизавета А',
            'М Анастасия Д', 'М Александра К', 'Р Алексей А', 'С Василиса Н',
            'Т Гай Н', 'Т Екатерина В', 'Ф Эмин Д', 'Х Александра Н', 'Ю Дарья И'
        ],
        fixedPairs: [['Г Ярослав О', 'Г Ксения А']]
    }
};

// Группировка по первой букве
function groupPeopleByFirstLetter(people) {
    const groups = {};
    people.forEach(name => {
        const letter = name.charAt(0).toUpperCase();
        if (!groups[letter]) groups[letter] = [];
        groups[letter].push(name);
    });
    return Object.keys(groups).sort().map(letter => ({
        letter,
        people: groups[letter].sort()
    }));
}

// === Рендер чекбоксов ===
function renderAbsentCheckboxes(subjectKey) {
    const subject = SUBJECTS_DATA[subjectKey];
    const container = document.getElementById('absentList');
    const groups = groupPeopleByFirstLetter(subject.people);

    let html = '';
    groups.forEach(group => {
        html += `<div class="absent-group">
            <div class="absent-group-title">${group.letter}</div>
            <div class="absent-items">`;
        group.people.forEach(name => {
            const id = `absent_${name.replace(/\s+/g, '_').replace(/[^\w]/g, '')}`;
            html += `
                <div class="absent-item">
                    <input type="checkbox" id="${id}" name="absent" value="${name}">
                    <label for="${id}">${name}</label>
                </div>`;
        });
        html += `</div></div>`;
    });
    container.innerHTML = html;

    setupSearchFilter();
}

// 🔥 Улучшенный поиск (регистронезависимый)
function setupSearchFilter() {
    const searchInput = document.getElementById('absentSearch');
    const items = document.querySelectorAll('.absent-item');
    const labels = Array.from(items).map(item => item.querySelector('label'));

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.trim().toLowerCase();
        items.forEach((item, i) => {
            const name = labels[i].textContent.toLowerCase();
            item.style.display = name.includes(query) ? 'flex' : 'none';
        });
    });
}

// === Кнопки управления ===
function selectAllAbsent() {
    const checkboxes = document.querySelectorAll('#absentList input[type="checkbox"]');
    checkboxes.forEach(cb => cb.checked = true);
}

function clearAllAbsent() {
    const checkboxes = document.querySelectorAll('#absentList input[type="checkbox"]');
    checkboxes.forEach(cb => cb.checked = false);
}

function resetSearch() {
    document.getElementById('absentSearch').value = '';
    document.getElementById('absentSearch').dispatchEvent(new Event('input'));
}

// === Логика распределения ===
function divideIntoTeamsWithPairs(people, teamsCount, fixedPairs) {
    const peopleSet = new Set(people);
    const teams = Array.from({ length: teamsCount }, () => []);
    let remaining = [...people];

    for (const [a, b] of fixedPairs) {
        if (peopleSet.has(a) && peopleSet.has(b)) {
            const teamIdx = getRandomMinTeamIndex(teams);
            teams[teamIdx].push(a, b);
            remaining = remaining.filter(p => p !== a && p !== b);
        }
    }

    const shuffledRemaining = shuffleArray(remaining);
    for (const person of shuffledRemaining) {
        const teamIdx = getRandomMinTeamIndex(teams);
        teams[teamIdx].push(person);
    }

    for (const team of teams) {
        shuffleArrayInPlace(team);
    }

    return balanceTeams(teams);
}

// === UI ===
function showError(message) {
    document.getElementById('error').textContent = `⚠️ Ошибка: ${message}`;
    document.getElementById('error').style.display = 'block';
    document.getElementById('warning').style.display = 'none';
}
function showWarning(message) {
    document.getElementById('warning').textContent = `ℹ️ ${message}`;
    document.getElementById('warning').style.display = 'block';
}
function hideMessages() {
    document.getElementById('error').style.display = 'none';
    document.getElementById('warning').style.display = 'none';
}
function renderTeams(teams, subjectName) {
    document.getElementById('results').innerHTML = `
        <h2>✅ Команды по предмету: <em>${subjectName}</em></h2>
        ${teams.map((team, i) => `
            <div class="team">
                <strong>🔹 Команда ${i + 1} (${team.length}):</strong><br>
                ${team.join(', ')}
            </div>
        `).join('')}
    `;
}

// === Инициализация ===
document.addEventListener('DOMContentLoaded', () => {
    renderAbsentCheckboxes('geo');

    // Обработчики кнопок
    document.getElementById('selectAll').addEventListener('click', selectAllAbsent);
    document.getElementById('clearAll').addEventListener('click', clearAllAbsent);
    document.getElementById('resetSearch').addEventListener('click', resetSearch);

    // Смена предмета
    document.getElementById('subject').addEventListener('change', function() {
        renderAbsentCheckboxes(this.value);
    });

    // Отправка формы
    document.getElementById('teamForm').addEventListener('submit', e => {
        e.preventDefault();
        hideMessages();

        const subjectKey = document.getElementById('subject').value;
        let teamsCount = parseInt(document.getElementById('teams_count').value);

        if (isNaN(teamsCount) || teamsCount < 1) return showError('Число команд должно быть ≥ 1');
        const subject = SUBJECTS_DATA[subjectKey];
        if (!subject) return showError('Неизвестный предмет');

        const checkedBoxes = document.querySelectorAll('#absentList input[type="checkbox"]:checked');
        const absentList = Array.from(checkedBoxes).map(cb => cb.value);
        const available = subject.people.filter(p => !absentList.includes(p));
        const availableCount = available.length;

        if (availableCount === 0) return showError('Некого делить — все отсутствуют.');

        const maxAllowed = getAdjustedTeamsCount(availableCount, teamsCount);
        if (teamsCount > maxAllowed) {
            const oldCount = teamsCount;
            teamsCount = maxAllowed;
            showWarning(
                `Число команд уменьшено с ${oldCount} до ${teamsCount}, ` +
                `чтобы избежать команд с 0–1 участником. Максимум при ${availableCount} участниках: ${maxAllowed}.`
            );
        }

        if (teamsCount > availableCount) return showError(`Нельзя создать ${teamsCount} команд из ${availableCount} человек.`);

        try {
            const teams = divideIntoTeamsWithPairs(available, teamsCount, subject.fixedPairs);
            if (teams.some(t => t.length === 0)) {
                throw new Error('Обнаружена пустая команда. Попробуйте уменьшить число команд.');
            }
            renderTeams(teams, subject.name);
        } catch (err) {
            showError('Ошибка: ' + err.message);
        }
    });
});