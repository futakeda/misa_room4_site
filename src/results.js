document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const region = params.get('region');
    const period = params.get('period');
    const threshold = params.get('threshold');

    // --- DATA --- 
    const weekToDateMap = {
        '第43週': '10/20～10/26', '第42週': '10/13～10/19', '第41週': '10/06～10/12', '第40週': '09/29～10/05',
        '第39週': '09/22～09/28', '第38週': '09/15～09/21', '第37週': '09/08～09/14', '第36週': '09/01～09/07',
    };

    const regionalComments = {
        '北海道': {
            '第43週': '報告数8.43と急増しており、本格的な流行となっています。前週の3.29から2.5倍以上の増加であり、急速な感染拡大に厳重な警戒が必要です。',
        },
        '東京都': {
            '第43週': '報告数10.37と、警報レベルの10.0を超え、都内で大きな流行が発生しています。前週から約2倍の増加であり、ピークはまだ見えません。',
        },
        '大阪府': {
            '第43週': '報告数5.68と、前週から倍増しており、府内での流行が急速に拡大しています。',
        },
        '宮城県': {
            '第43週': '報告数8.35と急増し、本格的な流行期に入りました。前週の3.45から2倍以上の増加であり、急速な感染拡大に厳重な警戒が必要です。',
        }
    };

    const influenzaData = {
        '北海道': {'第43週': 8.43, '第42週': 3.29, '第41週': 2.10, '第40週': 0.80, '第39週': 0.57, '第38週': 0.19, '第37週': 0.38, '第36週': 0.46},
        '青森県': {'第43週': 2.19, '第42週': 0.83, '第41週': 0.58, '第40週': 0.29, '第39週': 0.37, '第38週': 0.19, '第37週': 0.46, '第36週': 0.73},
        '岩手県': {'第43週': 6.31, '第42週': 2.48, '第41週': 1.02, '第40週': 0.29, '第39週': 0.05, '第38週': 0.10, '第37週': 0.32, '第36週': 0.02},
        '宮城県': {'第43週': 8.35, '第42週': 3.45, '第41週': 1.96, '第40週': 0.96, '第39週': 0.36, '第38週': 0.09, '第37週': 0.11, '第36週': 0.18},
        '東京都': {'第43週': 10.37, '第42週': 5.59, '第41週': 4.76, '第40週': 3.30, '第39週': 1.96, '第38週': 1.00, '第37週': 0.67, '第36週': 0.39},
        '大阪府': {'第43週': 5.68, '第42週': 2.74, '第41週': 1.88, '第40週': 1.66, '第39週': 1.21, '第38週': 1.05, '第37週': 0.75, '第36週': 0.36},
    };
    const closureData = {
        '北海道': {'第43週': {school:1, grade:6, class:17}, '第42週': {school:1, grade:1, class:6}, '第41週': {school:1, grade:0, class:4}, '第40週': {school:0, grade:0, class:1}, '第39週': {school:0, grade:0, class:3}, '第38週': {school:0, grade:0, class:0}, '第37週': {school:0, grade:0, class:1}, '第36週': {school:0, grade:1, class:1}},
        '東京都': {'第43週': {school:2, grade:28, class:128}, '第42週': {school:4, grade:11, class:56}, '第41週': {school:2, grade:7, class:43}, '第40週': {school:0, grade:8, class:31}, '第39週': {school:1, grade:3, class:17}, '第38週': {school:0, grade:4, class:8}, '第37週': {school:1, grade:1, class:3}, '第36週': {school:0, grade:0, class:1}},
        '大阪府': {'第43週': {school:0, grade:14, class:58}, '第42週': {school:1, grade:3, class:18}, '第41週': {school:0, grade:2, class:20}, '第40週': {school:2, grade:3, class:18}, '第39週': {school:0, grade:1, class:13}, '第38週': {school:0, grade:0, class:12}, '第37週': {school:0, grade:2, class:12}, '第36週': {school:0, grade:0, class:3}},
        '宮城県': {'第43週': {school:2, grade:10, class:12}, '第42週': {school:1, grade:2, class:1}, '第41週': {school:0, grade:1, class:1}, '第40週': {school:0, grade:0, class:0}, '第39週': {school:0, grade:0, class:0}, '第38週': {school:0, grade:0, class:0}, '第37週': {school:0, grade:0, class:0}, '第36週': {school:0, grade:0, class:0}},
    };
    const nationalClosureSummary = {
        '第43週': {nursery:8, kindergarten:36, elementary:573, juniorHigh:300, highSchool:79, other:19},
        '第42週': {nursery:3, kindergarten:18, elementary:218, juniorHigh:105, highSchool:27, other:2},
    };
    const hospitalizationData = {
        '第43週': { ageBreakdown: {'1歳未満':12, '1～4歳':40, '5～9歳':58, '10～14歳':17, '15～19歳':6, '20～29歳':5, '30～39歳':8, '40～49歳':0, '50～59歳':11, '60～69歳':12, '70～79歳':22, '80歳以上':44}, admissionStatus: {icu:9, ventilator:2, tests:38}},
        '第42週': { ageBreakdown: {'1歳未満':6, '1～4歳':31, '5～9歳':21, '10～14歳':13, '15～19歳':8, '20～29歳':4, '30～39歳':5, '40～49歳':2, '50～59歳':7, '60～69歳':10, '70～79歳':10, '80歳以上':25}, admissionStatus: {icu:5, ventilator:3, tests:26}},
    };

    // --- RENDER PAGE ---
    document.getElementById('region').textContent = region;
    document.getElementById('period').textContent = `${period} (${weekToDateMap[period] || ''})`;
    document.getElementById('threshold').textContent = threshold;

    const regionData = influenzaData[region];
    if (regionData) {
        renderInfluenzaTable(regionData, period);
        renderClosureTable(closureData[region], period);
        renderNationalSummaryTable(nationalClosureSummary, period);
        renderWarningIcon(regionData, period, threshold);
        renderBarGraph(regionData);
        renderHospitalizationData(hospitalizationData, period);
        renderComment(regionalComments[region], period);
    } else {
        document.getElementById('results-table').textContent = '指定された地域のデータが見つかりません。';
    }

    // --- RENDER FUNCTIONS ---
    function renderInfluenzaTable(data, week) {
        const currentData = data[week];
        const weekNumber = parseInt(week.match(/(\d+)/)[0]);
        const previousWeek = '第' + (weekNumber - 1) + '週';
        const previousData = data[previousWeek];
        const container = document.getElementById('results-table');
        let tableHTML = `<table><tr><th>期間</th><th>定点当たり報告数</th></tr><tr><td>${week} (${weekToDateMap[week]})</td><td>${currentData !== undefined ? currentData : 'データなし'}</td></tr>`;
        if (previousData !== undefined) {
            tableHTML += `<tr><td>前週 (${previousWeek})</td><td>${previousData}</td></tr>`;
        }
        tableHTML += '</table>';
        container.innerHTML = tableHTML;
    }

    function renderClosureTable(data, week) {
        const container = document.getElementById('closure-table');
        const weeklyData = data ? data[week] : null;
        if (weeklyData) {
            container.innerHTML = `<table>
                <tr><th>種別</th><th>施設数</th></tr>
                <tr><td>休校</td><td>${weeklyData.school}</td></tr>
                <tr><td>学年閉鎖</td><td>${weeklyData.grade}</td></tr>
                <tr><td>学級閉鎖</td><td>${weeklyData.class}</td></tr>
            </table>`;
        } else {
            container.innerHTML = '<p>指定された地域の学級閉鎖等のデータはありません。</p>';
        }
    }

    function renderNationalSummaryTable(data, week) {
        const container = document.getElementById('national-summary-table');
        const weeklyData = data[week];
        if (weeklyData) {
            container.innerHTML = `<table>
                <tr><th>施設種別</th><th>全国合計施設数</th></tr>
                <tr><td>保育所等</td><td>${weeklyData.nursery}</td></tr>
                <tr><td>幼稚園</td><td>${weeklyData.kindergarten}</td></tr>
                <tr><td>小学校</td><td>${weeklyData.elementary}</td></tr>
                <tr><td>中学校</td><td>${weeklyData.juniorHigh}</td></tr>
                <tr><td>高等学校</td><td>${weeklyData.highSchool}</td></tr>
                <tr><td>その他</td><td>${weeklyData.other}</td></tr>
            </table>`;
        }
    }

    function renderWarningIcon(data, week, threshold) {
        const currentData = data[week];
        const weekNumber = parseInt(week.match(/(\d+)/)[0]);
        const previousWeek = '第' + (weekNumber - 1) + '週';
        const previousData = data[previousWeek];
        if (previousData !== undefined && currentData !== undefined && previousData > 0) {
            const increase = ((currentData - previousData) / previousData) * 100;
            if (increase > threshold) {
                document.getElementById('warning-icon').innerHTML = '&#x26A0;&#xFE0F; 急増中';
            }
        }
    }

    function renderBarGraph(data) {
        const container = document.getElementById('graph');
        const weeks = Object.keys(data).sort((a, b) => parseInt(a.match(/(\d+)/)[0]) - parseInt(b.match(/(\d+)/)[0]));
        const maxVal = Math.max(...Object.values(data));
        weeks.forEach(week => {
            const value = data[week];
            const bar = document.createElement('div');
            bar.className = 'bar';
            bar.style.height = `${(value / maxVal) * 100}%`;
            const dateLabel = weekToDateMap[week].split('～')[0];
            bar.innerHTML = `<span>${value}</span><div class="bar-label">${dateLabel}~</div>`;
            container.appendChild(bar);
        });
    }

    function renderHospitalizationData(data, week) {
        const weeklyData = data[week];
        if (!weeklyData) return;

        const statusContainer = document.getElementById('admission-status-table');
        statusContainer.innerHTML = `<table>
            <tr><th>状況</th><th>報告数</th></tr>
            <tr><td>ICU入室</td><td>${weeklyData.admissionStatus.icu}</td></tr>
            <tr><td>人工呼吸器の利用</td><td>${weeklyData.admissionStatus.ventilator}</td></tr>
            <tr><td>頭部CT等の検査実施</td><td>${weeklyData.admissionStatus.tests}</td></tr>
        </table>`;

        const pieChart = document.getElementById('pie-chart');
        const legend = document.getElementById('pie-chart-legend');
        const ageData = weeklyData.ageBreakdown;
        const totalPatients = Object.values(ageData).reduce((sum, value) => sum + value, 0);
        const colors = ['#66c2a5', '#fc8d62', '#8da0cb', '#e78ac3', '#a6d854', '#ffd92f', '#e5c494', '#b3b3b3', '#ff9999', '#99ccff', '#ffcc99', '#c2f0c2'];
        
        let gradient = 'conic-gradient(';
        let currentPercentage = 0;
        let legendHTML = '';
        let colorIndex = 0;

        for (const ageGroup in ageData) {
            const value = ageData[ageGroup];
            if (totalPatients === 0) continue;
            const percentage = (value / totalPatients) * 100;
            const color = colors[colorIndex % colors.length];

            gradient += `${color} ${currentPercentage}% ${currentPercentage + percentage}%`;
            currentPercentage += percentage;
            if (currentPercentage < 100) gradient += ', ';

            legendHTML += `<div class="legend-item">
                <div class="legend-color" style="background-color: ${color};"></div>
                <span>${ageGroup}: ${value}人 (${percentage.toFixed(1)}%)</span>
            </div>`;
            colorIndex++;
        }
        gradient += ')';

        pieChart.style.background = gradient;
        legend.innerHTML = legendHTML;
    }

    function renderComment(data, week) {
        const comment = data ? (data[week] || 'この地域のこの週に関する詳細なコメントはありません。') : 'この地域のコメントはありません。';
        document.getElementById('comment').textContent = comment;
    }
});
