document.addEventListener('DOMContentLoaded', () => {
    // --- DATA ---
    const weekToDateMap = {
        '第43週': '10/20～10/26', '第42週': '10/13～10/19', '第41週': '10/06～10/12', '第40週': '09/29～10/05',
        '第39週': '09/22～09/28', '第38週': '09/15～09/21', '第37週': '09/08～09/14', '第36週': '09/01～09/07',
    };
    const regionalComments = {
        '北海道': {'第43週': '報告数8.43と急増しており、本格的な流行となっています。'},
        '東京都': {'第43週': '報告数10.37と、警報レベルの10.0を超え、都内で大きな流行が発生しています。'},
        '大阪府': {'第43週': '報告数5.68と、前週から倍増しており、府内での流行が急速に拡大しています。'},
        '宮城県': {'第43週': '報告数8.35と急増し、本格的な流行期に入りました。'},
    };
    const influenzaData = {
        '北海道': {'第43週': 8.43, '第42週': 3.29, '第41週': 2.10, '第40週': 0.80, '第39週': 0.57, '第38週': 0.19, '第37週': 0.38, '第36週': 0.46},
        '青森県': {'第43週': 2.19, '第42週': 0.83, '第41週': 0.58, '第40週': 0.29, '第39週': 0.37, '第38週': 0.19, '第37週': 0.46, '第36週': 0.73},
        '岩手県': {'第43週': 6.31, '第42週': 2.48, '第41週': 1.02, '第40週': 0.29, '第39週': 0.05, '第38週': 0.10, '第37週': 0.32, '第36週': 0.02},
        '宮城県': {'第43週': 8.35, '第42週': 3.45, '第41週': 1.96, '第40週': 0.96, '第39週': 0.36, '第38週': 0.09, '第37週': 0.11, '第36週': 0.18},
        '秋田県': {'第43週': 3.92, '第42週': 1.20, '第41週': 0.36, '第40週': 0.12, '第39週': 0.04, '第38週': 0.20, '第37週': 0.16, '第36週': 0.20},
        '山形県': {'第43週': 3.74, '第42週': 0.82, '第41週': 0.67, '第40週': 0.23, '第39週': 0.23, '第38週': 0.05, '第37週': 0.00, '第36週': 0.00},
        '福島県': {'第43週': 6.33, '第42週': 3.17, '第41週': 1.17, '第40週': 0.79, '第39週': 0.15, '第38週': 0.15, '第37週': 0.10, '第36週': 0.44},
        '茨城県': {'第43週': 5.43, '第42週': 2.47, '第41週': 1.59, '第40週': 2.07, '第39週': 1.07, '第38週': 0.67, '第37週': 0.32, '第36週': 0.16},
        '栃木県': {'第43週': 3.79, '第42週': 1.30, '第41週': 0.79, '第40週': 0.64, '第39週': 0.60, '第38週': 0.26, '第37週': 1.02, '第36週': 0.70},
        '群馬県': {'第43週': 4.98, '第42週': 2.07, '第41週': 1.07, '第40週': 0.82, '第39週': 0.22, '第38週': 0.40, '第37週': 0.30, '第36週': 0.49},
        '埼玉県': {'第43週': 11.73, '第42週': 6.23, '第41週': 3.92, '第40週': 2.16, '第39週': 1.43, '第38週': 0.96, '第37週': 0.75, '第36週': 0.49},
        '千葉県': {'第43週': 11.82, '第42週': 6.99, '第41週': 4.20, '第40週': 2.36, '第39週': 1.30, '第38週': 1.15, '第37週': 0.99, '第36週': 0.67},
        '東京都': {'第43週': 10.37, '第42週': 5.59, '第41週': 4.76, '第40週': 3.30, '第39週': 1.96, '第38週': 1.00, '第37週': 0.67, '第36週': 0.39},
        '神奈川県': {'第43週': 11.88, '第42週': 5.62, '第41週': 4.21, '第40週': 2.47, '第39週': 1.24, '第38週': 0.71, '第37週': 0.66, '第36週': 0.39},
        '新潟県': {'第43週': 2.05, '第42週': 0.85, '第41週': 0.42, '第40週': 0.24, '第39週': 0.20, '第38週': 0.27, '第37週': 0.09, '第36週': 0.27},
        '富山県': {'第43週': 1.92, '第42週': 0.63, '第41週': 0.56, '第40週': 0.52, '第39週': 0.81, '第38週': 0.48, '第37週': 0.44, '第36週': 0.70},
        '石川県': {'第43週': 3.89, '第42週': 2.15, '第41週': 1.15, '第40週': 0.83, '第39週': 0.70, '第38週': 0.40, '第37週': 0.26, '第36週': 0.17},
        '福井県': {'第43週': 2.95, '第42週': 0.82, '第41週': 0.67, '第40週': 1.23, '第39週': 1.05, '第38週': 0.64, '第37週': 0.21, '第36週': 0.08},
        '山梨県': {'第43週': 2.37, '第42週': 1.20, '第41週': 0.97, '第40週': 0.71, '第39週': 0.17, '第38週': 0.12, '第37週': 0.06, '第36週': 0.09},
        '長野県': {'第43週': 1.41, '第42週': 1.32, '第41週': 1.46, '第40週': 1.40, '第39週': 0.81, '第38週': 0.64, '第37週': 2.09, '第36週': 1.47},
        '岐阜県': {'第43週': 2.13, '第42週': 1.27, '第41週': 0.84, '第40週': 1.07, '第39週': 0.67, '第38週': 0.04, '第37週': 0.11, '第36週': 0.38},
        '静岡県': {'第43週': 5.25, '第42週': 4.23, '第41週': 0.99, '第40週': 0.62, '第39週': 0.47, '第38週': 0.46, '第37週': 0.36, '第36週': 0.22},
        '愛知県': {'第43週': 3.64, '第42週': 1.44, '第41週': 1.10, '第40週': 0.57, '第39週': 0.46, '第38週': 0.37, '第37週': 0.36, '第36週': 0.31},
        '三重県': {'第43週': 4.66, '第42週': 2.47, '第41週': 2.09, '第40週': 1.34, '第39週': 1.31, '第38週': 1.33, '第37週': 1.26, '第36週': 0.39},
        '滋賀県': {'第43週': 2.79, '第42週': 1.38, '第41週': 0.62, '第40週': 0.24, '第39週': 0.24, '第38週': 0.31, '第37週': 0.29, '第36週': 0.26},
        '京都府': {'第43週': 4.49, '第42週': 2.38, '第41週': 2.61, '第40週': 1.56, '第39週': 1.39, '第38週': 1.23, '第37週': 1.54, '第36週': 1.31},
        '大阪府': {'第43週': 5.68, '第42週': 2.74, '第41週': 1.88, '第40週': 1.66, '第39週': 1.21, '第38週': 1.05, '第37週': 0.75, '第36週': 0.36},
        '兵庫県': {'第43週': 5.85, '第42週': 2.66, '第41週': 1.14, '第40週': 0.98, '第39週': 0.69, '第38週': 1.09, '第37週': 0.60, '第36週': 0.52},
        '奈良県': {'第43週': 4.26, '第42週': 1.93, '第41週': 2.12, '第40週': 1.24, '第39週': 0.60, '第38週': 0.60, '第37週': 0.21, '第36週': 0.14},
        '和歌山県': {'第43週': 7.20, '第42週': 2.58, '第41週': 2.09, '第40週': 0.51, '第39週': 0.27, '第38週': 0.11, '第37週': 0.09, '第36週': 0.00},
        '鳥取県': {'第43週': 1.07, '第42週': 0.38, '第41週': 1.38, '第40週': 0.41, '第39週': 0.03, '第38週': 0.10, '第37週': 0.24, '第36週': 0.17},
        '島根県': {'第43週': 2.80, '第42週': 3.20, '第41週': 2.50, '第40週': 1.50, '第39週': 0.35, '第38週': 0.20, '第37週': 0.15, '第36週': 0.00},
        '岡山県': {'第43週': 2.88, '第42週': 0.48, '第41週': 0.64, '第40週': 0.30, '第39週': 0.16, '第38週': 0.36, '第37週': 0.24, '第36週': 0.26},
        '広島県': {'第43週': 2.02, '第42週': 0.98, '第41週': 1.70, '第40週': 0.55, '第39週': 0.32, '第38週': 0.16, '第37週': 0.37, '第36週': 0.30},
        '山口県': {'第43週': 3.95, '第42週': 1.08, '第41週': 1.48, '第40週': 0.63, '第39週': 0.21, '第38週': 0.22, '第37週': 0.22, '第36週': 0.52},
        '徳島県': {'第43週': 0.85, '第42週': 0.76, '第41週': 0.18, '第40週': 0.06, '第39週': 0.06, '第38週': 0.12, '第37週': 0.09, '第36週': 0.06},
        '香川県': {'第43週': 1.30, '第42週': 1.10, '第41週': 1.33, '第40週': 0.90, '第39週': 0.28, '第38週': 0.55, '第37週': 0.38, '第36週': 0.20},
        '愛媛県': {'第43週': 6.59, '第42週': 1.32, '第41週': 0.81, '第40週': 0.73, '第39週': 1.00, '第38週': 0.37, '第37週': 0.39, '第36週': 0.27},
        '高知県': {'第43週': 0.61, '第42週': 0.53, '第41週': 0.18, '第40週': 0.08, '第39週': 0.24, '第38週': 0.24, '第37週': 0.92, '第36週': 0.95},
        '福岡県': {'第43週': 3.93, '第42週': 2.70, '第41週': 2.14, '第40週': 1.98, '第39週': 1.55, '第38週': 1.61, '第37週': 2.30, '第36週': 1.20},
        '佐賀県': {'第43週': 0.79, '第42週': 0.67, '第41週': 0.54, '第40週': 0.46, '第39週': 0.38, '第38週': 0.42, '第37週': 0.38, '第36週': 0.08},
        '長崎県': {'第43週': 2.24, '第42週': 2.86, '第41週': 2.29, '第40週': 0.49, '第39週': 1.51, '第38週': 1.06, '第37週': 1.04, '第36週': 0.61},
        '熊本県': {'第43週': 2.68, '第42週': 1.29, '第41週': 1.10, '第40週': 0.81, '第39週': 1.31, '第38週': 1.49, '第37週': 1.29, '第36週': 0.74},
        '大分県': {'第43週': 6.07, '第42週': 3.45, '第41週': 2.72, '第40週': 1.45, '第39週': 1.52, '第38週': 0.43, '第37週': 0.10, '第36週': 0.29},
        '宮崎県': {'第43週': 1.57, '第42週': 2.43, '第41週': 3.21, '第40週': 2.89, '第39週': 0.61, '第38週': 0.54, '第37週': 0.07, '第36週': 0.29},
        '鹿児島県': {'第43週': 2.72, '第42週': 1.32, '第41週': 1.39, '第40週': 1.28, '第39週': 1.68, '第38週': 3.07, '第37週': 3.00, '第36週': 2.16},
        '沖縄県': {'第43週': 19.40, '第42週': 15.04, '第41週': 14.38, '第40週': 12.18, '第39週': 8.98, '第38週': 7.04, '第37週': 4.93, '第36週': 3.16},
    };
    const closureData = {
        '北海道': {'第43週': {school:1, grade:6, class:17}},
        '宮城県': {'第43週': {school:2, grade:10, class:12}},
        '東京都': {'第43週': {school:2, grade:28, class:128}},
        '大阪府': {'第43週': {school:0, grade:14, class:58}},
    };
    const nationalClosureSummary = {
        '第43週': {nursery:8, kindergarten:36, elementary:573, juniorHigh:300, highSchool:79, other:19},
    };
    const hospitalizationData = {
        '第43週': { ageBreakdown: {'1歳未満':12, '1～4歳':40, '5～9歳':58, '10～14歳':17, '60～69歳':12, '70～79歳':22, '80歳以上':44}, admissionStatus: {icu:9, ventilator:2, tests:38}},
    };

    const params = new URLSearchParams(window.location.search);
    const region = params.get('region');
    const period = params.get('period');
    const threshold = params.get('threshold');

    document.getElementById('region').textContent = region;
    document.getElementById('period').textContent = `${period} (${weekToDateMap[period] || ''})`;
    document.getElementById('threshold').textContent = threshold;

    const regionData = influenzaData[region];
    if (regionData) {
        renderInfluenzaTable(regionData, period);
        renderClosureTable(closureData[region], period);
        renderNationalSummaryTable(nationalClosureSummary, period);
        handleAlert(regionData, period, threshold);
        renderBarGraph(regionData);
        renderHospitalizationData(hospitalizationData, period);
        renderComment(regionalComments[region], period);
        setupModal();
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
            container.innerHTML = `<table><tr><th>種別</th><th>施設数</th></tr><tr><td>休校</td><td>${weeklyData.school}</td></tr><tr><td>学年閉鎖</td><td>${weeklyData.grade}</td></tr><tr><td>学級閉鎖</td><td>${weeklyData.class}</td></tr></table>`;
        } else {
            container.innerHTML = '<p>指定された地域の学級閉鎖等のデータはありません。</p>';
        }
    }

    function renderNationalSummaryTable(data, week) {
        const container = document.getElementById('national-summary-table');
        const weeklyData = data[week];
        if (weeklyData) {
            container.innerHTML = `<table><tr><th>施設種別</th><th>全国合計施設数</th></tr><tr><td>保育所等</td><td>${weeklyData.nursery}</td></tr><tr><td>幼稚園</td><td>${weeklyData.kindergarten}</td></tr><tr><td>小学校</td><td>${weeklyData.elementary}</td></tr><tr><td>中学校</td><td>${weeklyData.juniorHigh}</td></tr><tr><td>高等学校</td><td>${weeklyData.highSchool}</td></tr><tr><td>その他</td><td>${weeklyData.other}</td></tr></table>`;
        } else {
             container.innerHTML = '<p>データなし</p>';
        }
    }

    function handleAlert(data, week, threshold) {
        const currentData = data[week];
        const weekNumber = parseInt(week.match(/(\d+)/)[0]);
        const previousWeek = '第' + (weekNumber - 1) + '週';
        const previousData = data[previousWeek];
        if (previousData !== undefined && currentData !== undefined && previousData > 0) {
            const increase = ((currentData - previousData) / previousData) * 100;
            if (increase > threshold) {
                const modal = document.getElementById('alert-modal');
                const modalText = document.getElementById('modal-text');
                const warningIconDiv = document.getElementById('warning-icon');

                const alertMessage = `&#x26A0;&#xFE0F; 急増アラート<br>前週比 ${increase.toFixed(0)}% 増`;
                modalText.innerHTML = alertMessage;
                warningIconDiv.innerHTML = alertMessage; // Display persistently on page
                warningIconDiv.classList.add('blinking-alert'); // Add blinking class
                modal.style.display = 'flex';
            }
        }
    }

    function setupModal() {
        const modal = document.getElementById('alert-modal');
        const closeBtn = document.querySelector('.modal-close');
        const warningIconDiv = document.getElementById('warning-icon');

        closeBtn.onclick = () => { 
            modal.style.display = 'none'; 
        };
        window.onclick = (event) => {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        };
    }

    function renderBarGraph(data) {
        const container = document.getElementById('graph');
        container.innerHTML = ''; // Clear previous graph
        const weeks = Object.keys(data).sort((a, b) => parseInt(a.match(/(\d+)/)[0]) - parseInt(b.match(/(\d+)/)[0]));
        const maxVal = Math.max(...Object.values(data));
        weeks.forEach(week => {
            const value = data[week];
            const bar = document.createElement('div');
            bar.className = 'bar';
            bar.style.height = `${(value / maxVal) * 100}%`;
            const dateLabel = weekToDateMap[week] ? weekToDateMap[week].split('～')[0] : '';
            bar.innerHTML = `<span>${value}</span><div class="bar-label">${dateLabel}~</div>`;
            container.appendChild(bar);
        });
    }

    function renderHospitalizationData(data, week) {
        const weeklyData = data[week];
        const statusContainer = document.getElementById('admission-status-table');
        const pieChart = document.getElementById('pie-chart');
        const legend = document.getElementById('pie-chart-legend');
        
        if (!weeklyData) {
            statusContainer.innerHTML = '<p>データなし</p>';
            pieChart.style.background = '';
            legend.innerHTML = '';
            return;
        }

        statusContainer.innerHTML = `<table><tr><th>状況</th><th>報告数</th></tr><tr><td>ICU入室</td><td>${weeklyData.admissionStatus.icu}</td></tr><tr><td>人工呼吸器の利用</td><td>${weeklyData.admissionStatus.ventilator}</td></tr><tr><td>頭部CT等の検査実施</td><td>${weeklyData.admissionStatus.tests}</td></tr></table>`;

        const ageData = weeklyData.ageBreakdown;
        const totalPatients = Object.values(ageData).reduce((sum, value) => sum + value, 0);
        const colors = ['#66c2a5', '#fc8d62', '#8da0cb', '#e78ac3', '#a6d854', '#ffd92f', '#e5c494', '#b3b3b3'];
        
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

            legendHTML += `<div class="legend-item"><div class="legend-color" style="background-color: ${color};"></div><span>${ageGroup}: ${value}人 (${percentage.toFixed(1)}%)</span></div>`;
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
