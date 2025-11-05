document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const region = params.get('region');
    const period = params.get('period');
    const threshold = params.get('threshold');

    const weekToDateMap = {
        '第43週': '10/20～10/26',
        '第42週': '10/13～10/19',
        '第41週': '10/06～10/12',
        '第40週': '09/29～10/05',
        '第39週': '09/22～09/28',
        '第38週': '09/15～09/21',
        '第37週': '09/08～09/14',
        '第36週': '09/01～09/07',
    };

    const weeklyComments = {
        '第43週': '全国的に流行が本格化し、特に首都圏では非常に高いレベルに達しています。沖縄県でも再び感染者数が急増しており、全国的な警戒が必要です。',
        '第42週': '全国的な流行が継続しており、特に首都圏での増加が著しいです。愛知県や大阪府など、他の大都市圏でも感染拡大の兆しが見られます。',
        '第41週': '首都圏を中心に全国的に感染が急拡大しています。沖縄県は高止まりの状況ですが、今後の動向に注意が必要です。',
        '第40週': '首都圏での感染拡大が本格化し、全国的な増加傾向が続いています。沖縄県では依然として非常に高いレベルでの流行が継続中です。',
        '第39週': '全国の定点当たり報告数が1.0を超え、流行シーズンに入りました。沖縄に加え、首都圏でも感染者数の増加が目立ち始めています。',
        '第38週': '沖縄県での感染拡大が続いており、全国平均を押し上げています。他の地域はまだ低いレベルですが、全体的に増加傾向にあります。',
        '第37週': '全国的に緩やかな増加傾向です。特に沖縄県での感染拡大が顕著で、九州地方でも感染が広がりつつあります。',
        '第36週': 'シーズン初期ですが、沖縄県、鹿児島県など一部の地域で感染の広がりが見られ始めました。',
    };

    document.getElementById('region').textContent = region;
    document.getElementById('period').textContent = `${period} (${weekToDateMap[period]})`;
    document.getElementById('threshold').textContent = threshold;

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
        '北海道': {'第43週': {school:1, grade:6, class:17}, '第42週': {school:1, grade:1, class:6}, '第41週': {school:1, grade:0, class:4}, '第40週': {school:0, grade:0, class:1}, '第39週': {school:0, grade:0, class:3}, '第38週': {school:0, grade:0, class:0}, '第37週': {school:0, grade:0, class:1}, '第36週': {school:0, grade:1, class:1}},
        '東京都': {'第43週': {school:2, grade:28, class:128}, '第42週': {school:4, grade:11, class:56}, '第41週': {school:2, grade:7, class:43}, '第40週': {school:0, grade:8, class:31}, '第39週': {school:1, grade:3, class:17}, '第38週': {school:0, grade:4, class:8}, '第37週': {school:1, grade:1, class:3}, '第36週': {school:0, grade:0, class:1}},
        '大阪府': {'第43週': {school:0, grade:14, class:58}, '第42週': {school:1, grade:3, class:18}, '第41週': {school:0, grade:2, class:20}, '第40週': {school:2, grade:3, class:18}, '第39週': {school:0, grade:1, class:13}, '第38週': {school:0, grade:0, class:12}, '第37週': {school:0, grade:2, class:12}, '第36週': {school:0, grade:0, class:3}},
    };
    const nationalClosureSummary = {
        '第43週': {nursery:8, kindergarten:36, elementary:573, juniorHigh:300, highSchool:79, other:19},
        '第42週': {nursery:3, kindergarten:18, elementary:218, juniorHigh:105, highSchool:27, other:2},
        '第41週': {nursery:5, kindergarten:11, elementary:200, juniorHigh:86, highSchool:22, other:4},
        '第40週': {nursery:5, kindergarten:8, elementary:121, juniorHigh:57, highSchool:17, other:1},
        '第39週': {nursery:0, kindergarten:5, elementary:68, juniorHigh:43, highSchool:19, other:0},
        '第38週': {nursery:1, kindergarten:3, elementary:54, juniorHigh:25, highSchool:9, other:3},
        '第37週': {nursery:0, kindergarten:4, elementary:72, juniorHigh:35, highSchool:6, other:3},
        '第36週': {nursery:0, kindergarten:2, elementary:31, juniorHigh:9, highSchool:3, other:0},
    };

    const regionData = influenzaData[region];
    const regionClosureData = closureData[region] ? closureData[region][period] : null;
    const nationalSummary = nationalClosureSummary[period];

    if (regionData) {
        const currentData = regionData[period];
        const weekNumber = parseInt(period.match(/(\d+)/)[0]);
        const previousWeek = '第' + (weekNumber - 1) + '週';
        const previousData = regionData[previousWeek];

        // --- Display Influenza Table ---
        const tableContainer = document.getElementById('results-table');
        const table = document.createElement('table');
        let tableHTML = `<tr><th>期間</th><th>定点当たり報告数</th></tr><tr><td>${period} (${weekToDateMap[period]})</td><td>${currentData !== undefined ? currentData : 'データなし'}</td></tr>`;
        if (previousData !== undefined) {
            tableHTML += `<tr><td>前週 (${previousWeek})</td><td>${previousData}</td></tr>`;
        }
        table.innerHTML = tableHTML;
        tableContainer.appendChild(table);

        // --- Display Closure Table ---
        const closureTableContainer = document.getElementById('closure-table');
        if(regionClosureData){
            const closureTable = document.createElement('table');
            closureTable.innerHTML = `
                <tr><th>種別</th><th>施設数</th></tr>
                <tr><td>休校</td><td>${regionClosureData.school}</td></tr>
                <tr><td>学年閉鎖</td><td>${regionClosureData.grade}</td></tr>
                <tr><td>学級閉鎖</td><td>${regionClosureData.class}</td></tr>
            `;
            closureTableContainer.appendChild(closureTable);
        } else {
            closureTableContainer.innerHTML = '<p>指定された地域の学級閉鎖等のデータはありません。</p>';
        }

        // --- Display National Summary Table ---
        const nationalSummaryContainer = document.getElementById('national-summary-table');
        if(nationalSummary){
            const summaryTable = document.createElement('table');
            summaryTable.innerHTML = `
                <tr><th>施設種別</th><th>全国合計施設数</th></tr>
                <tr><td>保育所等</td><td>${nationalSummary.nursery}</td></tr>
                <tr><td>幼稚園</td><td>${nationalSummary.kindergarten}</td></tr>
                <tr><td>小学校</td><td>${nationalSummary.elementary}</td></tr>
                <tr><td>中学校</td><td>${nationalSummary.juniorHigh}</td></tr>
                <tr><td>高等学校</td><td>${nationalSummary.highSchool}</td></tr>
                <tr><td>その他</td><td>${nationalSummary.other}</td></tr>
            `;
            nationalSummaryContainer.appendChild(summaryTable);
        }

        // --- Warning Icon ---
        if (previousData !== undefined && currentData !== undefined && previousData > 0) {
            const increase = ((currentData - previousData) / previousData) * 100;
            if (increase > threshold) {
                document.getElementById('warning-icon').innerHTML = '&#x26A0;&#xFE0F; 急増中';
            }
        }

        // --- Graph ---
        const graphContainer = document.getElementById('graph');
        const weeks = Object.keys(regionData).sort((a, b) => parseInt(a.match(/(\d+)/)[0]) - parseInt(b.match(/(\d+)/)[0]));
        const maxVal = Math.max(...Object.values(regionData));
        weeks.forEach(week => {
            const value = regionData[week];
            const bar = document.createElement('div');
            bar.className = 'bar';
            bar.style.height = `${(value / maxVal) * 100}%`;
            const dateLabel = weekToDateMap[week].split('～')[0];
            bar.innerHTML = `<span>${value}</span><div class="bar-label">${dateLabel}~</div>`;
            graphContainer.appendChild(bar);
        });

        // --- Comment ---
        document.getElementById('comment').textContent = weeklyComments[period] || 'この週に関するコメントはありません。';

    } else {
        document.getElementById('results-table').textContent = '指定された地域のデータが見つかりません。';
    }
});
