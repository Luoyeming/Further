import React, { useState, useEffect } from 'react';
import * as echarts from 'echarts';

import moment from 'moment';



const UserData = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const [likeCount, setLikeCount] = useState(0);
    const [downloadCount, setDownLoadCount] = useState(0);
    // const [date,setDate] = useState([])
    useEffect(() => {
        let count = 0;
        user?.result?.likesCount.map((item) => {
            count += item.count
        });
        setLikeCount(count);
        count = 0;
        user?.result?.downloadCount.map((item) => {
            count += item.count
        });
        setDownLoadCount(count);
        let date = [];
        let countArr1 = [];
        let countArr2 = [];
        let userLikeCount = user?.result?.likesCount.slice(-14);
        let downLoadCount = user?.result?.downloadCount.slice(-14);
        for(let i = 0 ; i < 14 ; i++){
            date.unshift(moment().subtract(i, "days").format('YYYY-MM-DD'))
            let flag1 = false;
            let flag2 = false;
            userLikeCount.map((item)=>{
                if(item.date == moment().subtract(i, "days").format('YYYY-MM-DD')){
                    countArr1.unshift(item.count)
                    flag1 = true
                }
            })
            downLoadCount.map((item)=>{
                if(item.date == moment().subtract(i, "days").format('YYYY-MM-DD')){
                    countArr2.unshift(item.count)
                    flag2 = true
                }
            })
            if(!flag1){
                countArr1.unshift(0)
            }
            if(!flag2){
                countArr2.unshift(0)
            }
        }
        var myChart2 = echarts.init(document.getElementById('downloadData'));
        var myChart1 = echarts.init(document.getElementById('likeData'));
        window.addEventListener('resize', function() {
            myChart1.resize();
            myChart2.resize();
          });
        // 绘制图表
        myChart1.setOption({
            xAxis: {
                type: 'category',
                data: date,
                show:false,
            },
            yAxis: {
                show:false,
            },
            tooltip: {
                trigger: 'item',
                formatter: '{b0}<br />点赞{c0}'
            },
            series: [
                {
                    data: countArr1,
                    type: 'line',
                    lineStyle:{color:'#03c8a8'},
                    itemStyle:{color:'#03c8a8'}
                }
            ]
        });
        // 绘制图表
        myChart2.setOption({
            xAxis: {
                type: 'category',
                data: date,
                show:false
            },
            tooltip: {
                trigger: 'item',
                formatter: '{b0}<br />下载{c0}'
            },
            yAxis: {
                show:false,
            },
            series: [
                {
                    data: countArr2,
                    type: 'line',
                    lineStyle:{color:'#03c8a8'},
                    itemStyle:{color:'#03c8a8'}
                }
            ]
        });
    }, [])
    return <div style={{ margin: '10px 70px', display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ width: '40vw',  border: '1px solid #d9d9d9'}}>
            <div style={{margin:'20px'}}>
                <div style={{fontSize:'20px'}}>下载量</div>
                <div style={{fontSize:'25px'}}>{downloadCount}</div>
            </div>
            <div id='downloadData' style={{ width: '40vw', height: '40vh' }}>

            </div>
        </div>
        <div style={{ width: '40vw',  border: '1px solid #d9d9d9'}}>
            <div style={{margin:'20px'}}>
                <div style={{fontSize:'20px'}}>点赞量</div>
                <div style={{fontSize:'25px'}}>{likeCount}</div>
            </div>
            <div id='likeData' style={{ width: '40vw', height: '40vh' }}>

            </div>
        </div>
    </div>
}

export default UserData