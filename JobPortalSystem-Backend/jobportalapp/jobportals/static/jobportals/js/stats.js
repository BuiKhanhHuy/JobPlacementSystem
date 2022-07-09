const getStatsData = () => {
    $.ajax({
        url: `${window.location.origin}/stats/`,
        type: 'get',
        data: {
            year: new Date().getFullYear()
        },
        success: function (response) {
            // du lieu
            console.log(response)
            // hiển thị bieu do
            showChart(response)
            // hien thi table
            showTable(response)
        }
    })
}

const filterData = (quarterOne, year) => {
    $.ajax({
        url: `${window.location.origin}/stats/`,
        type: 'post',
        data: {
            quarterOne: quarterOne,
            year: year
        },
        success: function (response) {
            // du lieu
            console.log(response)
            // hiển thị bieu do
            showChart(response)
            // hien thi table
            showTable(response)
        }
    })
}


const showChart = (data) => {
    let labels = []
    let statsData = []
    let type = 'bar'
    let label = 'Biểu đồ thống kê số lượng ứng viên ứng tuyển theo ngành nghề'
    let bgColor = []
    let borderColor = []

    for (let i = 0; i < data.length; i++) {
        const d = data[i].job_post__career__career_name
        const l = data[i].count
        labels.push(d)
        statsData.push(l)

        let r = Math.random() * 255
        let g = Math.random() * 255
        let b = Math.random() * 255

        bgColor.push(`rgba(${r}, ${g}, ${b}, 0.8)`)
        borderColor.push(`rgba(${r}, ${g}, ${b}, 1)`)
    }


    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: type,
        data: {
            labels: labels,
            datasets: [{
                label: label,
                data: statsData,
                backgroundColor: bgColor,
                borderColor: borderColor,
                borderWidth: 1,
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                },
            }
        }
    });
}

const showTable = (data) => {
    let str = ''

    for (let i = 0; i < data.length; i++) {
        let label = data[i].job_post__career__career_name
        let quantity = data[i].count
        let idx = i + 1

        str += `
              <tr>
                 <td class="col-2 text-center">${idx}</td>
                 <td class="col-7">${label}</td>
                 <td class="col-3 text-center">${quantity}</td>
              </tr>
            `
    }
    if (str === '')
        str = `
              <tr>
                 <td colspan="3">Dữ liệu trống</td>
              </tr>
            `

    let bodyTable = document.getElementById('table-body')
    bodyTable.innerHTML = str
}


window.onload = function () {
    // dat mac dinh cho nam
    document.getElementById('txt-year').value = new Date().getFullYear()
    // cap nhat thong ke
    getStatsData()
    // click submit
    document.getElementById("submit-btn").addEventListener("click", function (event) {
        event.preventDefault()
        let quarterOne = parseInt(document.getElementById('select-quarter-one').value)
        let year = document.getElementById('txt-year')
        if (parseInt(year.value) < 0) {
            year.value = new Date().getFullYear()
            alert('Năm thống kế không được là số âm.')
        } else {
            filterData(quarterOne, parseInt(year.value))

            let t = ''
            if (quarterOne !== 0 && quarterOne !== undefined) {
                t = `Thống kê qúy ${quarterOne} năm ${year.value}`
            } else {
                t = `Thống kê cả năm ${year.value}`
            }
            document.getElementById('title-stats').innerText = t
        }
    });

}

