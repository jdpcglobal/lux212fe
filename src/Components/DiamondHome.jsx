import React, { useEffect, useState, ChangeEvent } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { callPostApiWithoutPayload } from './ApiCaller';
import * as ApiConst from './ApiConst';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Cookies from 'universal-cookie';
import DepositModal from "./SidebarComponents/DepositModal";
import WithdrawModal from "./SidebarComponents/WithdrawModal";
import RewardsModal from "./SidebarComponents/RewardsModal";
import HistoryModal from "./SidebarComponents/HistoryModal";
import BetHistoryModal from "./SidebarComponents/BetHistoryModal";
import SupportModal from "./SidebarComponents/SupportModal";
import InvitionModal from "./SidebarComponents/InvitionModal";
import BankTransaction from "./SidebarComponents/BankTransaction";
import TransferCredit from "./SidebarComponents/TransferCredit";
import ReadBank from "./SidebarComponents/ReadBank";
import UserProfile from "./SidebarComponents/UserProfile";
import { useBalance } from "./SidebarComponents/BalanceContext";
import LogoutModal from "./common/LogoutModal";
import Login from "./common/Login";

const DiamondHome = () => {

    const [launchGameData, setLaunchGameData] = useState([]);
    const [responseData, setResponseData] = useState([]);
    const [tabIndex, setTabIndex] = useState(1);
    const [tabpanelData, setTabpanelData] = useState([])
    const [tabsData, setTabsData] = useState([])
    const [loadingTabs, setLoadingTabs] = useState(false)
    const [gameImageLoader, setGameImageLoader] = useState(false);
    const [AdsData, setAdsData] = useState([])
    const loggedInUser = new Cookies().get("kisDiamond_LoggedIn")
    const { balance } = useBalance();
    const[logoutModal, setLogoutModal] = useState(false);

    const toggleLogoutModal = () => {
        setLogoutModal(false)
    }


    const [launchGameReqObj, setLaunchGameReqObj] = useState({
        TCode: "",
        PCode: "",
        GCode: "",
        Token: new Cookies().get("kisDiamond_LoggedIn")?.Token,
    })

    var settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000
    };

    //***** SLIDER API *****/
    useEffect(() => {
        ADS();
        getADSLists();
    }, []);

    const ADS = async () => {
        try {
            callPostApiWithoutPayload(ApiConst.ADS_Post, (response) => {
                if (response.isSuccess) {
                    var options = [];
                    const adContents = response.data.filter((x) => x.Type === 1);
                    if (adContents.length > 0) {
                        adContents.map((data, i) => {
                            options = [...options, ...data.AdContents]
                            // options.push([])
                        })
                    }
                    // const sliderURl =
                    // console.log("========= response.data ", options)
                    setAdsData(options)
                }
            },)
        } catch (error) {
            console.log('Error:', error);
        }
    };

    const getADSLists = () => {
    }
    //***** SLIDER API END *****/

    // ***** GET GAME TYPES API *****
    useEffect(() => {
        setLoadingTabs(true)
        fetchData();
        getGamesList();
    }, []);

    const fetchData = async () => {
        try {
            callPostApiWithoutPayload(ApiConst.Get_Game_Types_Post, (response) => {
                if (response.isSuccess) {
                    setTabsData(response.data)
                    setLoadingTabs(false)
                }
            }, (error) => {
                // console.log("error===== ", error)
            })
        } catch (error) {
            // console.log('Error:', error);
        }
    };

    const getGamesList = () => {

    }
    // ***** GET GAME TYPES END *****


    //*****GET PROVIDERS API *****/
    const handleTabSelect = (index) => {
        getTabPanelData(index)
        setTabIndex(index)
        // console.log("=========== ", index)
    }

    const getTabPanelData = async (i) => {
        let formData = new FormData();
        formData.append('TCode', `${i + 1}`);
        try {
            const response = await fetch('https://lux212.azurewebsites.net/Api/GetProviders',
                {
                    method: 'POST',
                    body: formData

                });
            const jsonData = await response.json();
            if (jsonData.isSuccess) {
                // setData(jsonData.data);
                setTabpanelData(jsonData.data)
            }
        } catch (error) {
            // console.log('Error:', error);
        }

    }
    //***** GET PROVIDER API END *****

    //***** GET LaunchGame API  *****/

    const handleGameClick = (gCode) => {
        let reqObj = {
            ...launchGameReqObj,
            GCode: gCode,
        }
        LaunchGame(reqObj);
    };

    const LaunchGame = async (reqObj) => {
        let formData = new FormData();
        formData.append('TCode', reqObj?.PCode);
        formData.append('PCode', reqObj?.TCode);
        formData.append('GCode', reqObj?.GCode);
        formData.append('Token', reqObj?.Token);

        try {
            const response = await fetch('https://lux212.azurewebsites.net/Api/LaunchGame', {
                method: 'POST',
                body: formData,
                // headers: { Authorization: 'f3c6c10757ade51e1d7a47c8ba3959d4' }
            });
            const jsonData = await response.json();
            if (jsonData.isSuccess) {
                let a = document.createElement('a');
                a.target = '_blank';
                a.href = jsonData.data;
                a.click();
                // console.log();
                setLaunchGameData(jsonData.data);
            }else{
                window.location.reload();
            }
            
        } catch (error) {
            console.log('Error:', error);
        }
    };
    //***** GET LaunchGame API END *****/

    //***** GET GAME API *****/
    const handleButtonClick = (pCode, tCode) => {
        setLaunchGameReqObj({
            ...launchGameReqObj,
            TCode: pCode,
            PCode: tCode,
        })
        setGameImageLoader(true)
        GetGames(tCode, pCode)
    }

    const GetGames = async (tCode, pCode) => {
        let formData = new FormData();
        formData.append('TCode', `${tCode}`);
        formData.append('PCode', `${pCode}`);
        try {
            const response = await fetch('https://lux212.azurewebsites.net/Api/GetGames', {
                method: 'POST',
                body: formData,
                // headers: {Authorization: 'f3c6c10757ade51e1d7a47c8ba3959d4'}
            });
            const jsonData = await response.json();
            if (jsonData.isSuccess) {
                // console.log(jsonData.data);
                setResponseData(jsonData.data);
                setGameImageLoader(false)
            }
        } catch (error) {
            // console.log('Error:', error);
        }
    };
    //***** GET GAME API END *****/

    return (
        <>
            <div className="container">
                <div className="row"></div>
            </div>

            <section id="mobile_header">
                <div className="header-bar header-fixed header-app header-bar-detached">
                    <a data-bs-toggle="offcanvas" data-bs-target="#menu-main" href="#"><i className="bi bi-list color-magenta-light" /></a>
                    <a href="#" className="header-title color-magenta-light">
                        <img src="https://m.kissdiamond.net/images/kdmE.png" alt="KISSDIAMOND" width="110px" />
                    </a>
                    <a href="gamecredit/index.html" style={{ display: 'inherit' }}> <i className="bi bi-wallet2" style={{ color: '#AC92EC !important', marginRight: '11px', textAlign: 'center', marginTop: '-15px', fontSize: '17px' }}>
                        <small style={{ lineHeight: '2px', display: 'block', textAlign: 'center', marginTop: '-9px', fontSize: '9px' }} className="trn">Return</small></i></a>
                </div>
            </section>
            {/* END PAGE CONTENT */}

            <section className="pcview">
                <div className="page-content header-clear-medium">
                    <div
                        className="alert bg-fade-magenta color-magenta-dark alert-dismissible rounded-0 py-2 mt-n2"
                        role="alert"
                        id="versionalert"
                        style={{ display: "none" }}
                    >
                        <i className="bi bi-cloud-download pe-2" />
                        <span>New version is available now - </span>
                        <a className="color-magenta-dark fst-italic" href="/download/">
                            Download
                        </a>
                        <button
                            type="button"
                            className="btn-close opacity-20 font-11 pt-1 mt-1"
                            data-bs-dismiss="alert"
                            aria-label="Close"
                        />
                    </div>

                    <div
                        className="splide single-slider slider-no-dots slider-no-arrows slider-boxed text-center mt-n1 splide--loop splide--ltr splide--draggable is-active"
                        id="mobilebanner"
                        style={{ visibility: "visible" }}
                    >
                        <Slider {...settings}>
                            {AdsData.length > 0 && AdsData.map((data, i) => (
                                <>
                                    <div className="banner w-100">
                                        <div className="splide__slide is-active is-visible">
                                            <div
                                                className="card card-style mx-0 shadow-card shadow-card-m"
                                                data-card-height={300}
                                                style={{
                                                    backgroundImage: `url(${data.Url})`,
                                                    height: 350,
                                                    objectFit: "contain"
                                                }}
                                            >
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ))}
                        </Slider>
                    </div>

                    {/* slider */}

                    <div className="content mx-3 mt-0" id="mobilediv">

                        <div className="row">
                            {/* end category app */}
                            {/* category pc */}
                            <div className="col-md-12 m-auto catslider_pc" style={{ padding: 0 }}>
                                {/*<div class="profile-tabs">*/}
                                <div className="splide slider-no-dots slider-no-arrows slider-visible-center text-center splide--slide splide--ltr splide--draggable is-active" id="category-pc" style={{ visibility: 'visible' }}>
                                    <div className="splide__track" style={{ borderBottom: 'solid 1px rgba(0, 0, 0, 0.07)' }} id="category-pc-track">
                                        <div className="splide__list" id="category-pc-list" style={{ transform: 'translateX(0px)' }}>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="Tabs" style={{ cursor: 'pointer' }}>
                                <Tabs selectedIndex={tabIndex} onSelect={(index) => handleTabSelect(index)}>
                                    <div className="get">
                                        <TabList>
                                            {tabsData.length > 0 && tabsData.map((games) =>
                                                <>
                                                    <Tab>{games.Description}</Tab>
                                                </>
                                            )}
                                        </TabList>
                                    </div>
                                    {tabsData.length > 0 && tabsData.map((rowData, i) =>
                                        <TabPanel className=" ">
                                            <>
                                                <div className='TabPanel' >
                                                    {tabpanelData.length > 0 && tabpanelData.map((data, i) =>
                                                        <>
                                                            <a className='mx-1 provider cursor' style={{display:"inline-block", marginRight:'5px'}} onClick={() => handleButtonClick(data.Code, data.GameTypeCode)}>{data.Name}</a>
                                                        </>
                                                    )}
                                                </div>
                                            </>
                                        </TabPanel>
                                    )}
                                </Tabs>
                            </div>
                            {/* end category pc */}
                        </div>
                        <div className="mt-3"></div>
                        <div className="row row-cols-3 row-cols-md-6">

                            {/* KING855 */}
                            {responseData.length > 0 && responseData.map((data) =>
                                <div className="col-3 p-1 game-item livecasino allgame" style={{ cursor: 'pointer' }}>
                                    <div className="card card-style rounded-s m-0">
                                        <img src="/images/process.gif" alt="" className="KING855 process" />
                                        <img onClick={() => handleGameClick(data.GameCode)}
                                            className="lazyload cursor"
                                            data-src="./imagies/live_855.jpg"
                                            src={data.ImageURL}
                                            alt=""
                                            onclick="action_live('KING855')"
                                        />
                                    </div>
                                    <div className="game-title" >{data.GameName}</div>
                                </div>
                            )}
                            {/* end KING855 */}

                        </div>
                        <div className="col-12 p-2 game-item promo" style={{ display: 'none' }}>
                            <div className="row" id="allpromotion1">        <div className="col-12 col-md-6 promo">
                                <div className="card card-style mb-0 mx-0">
                                    <img src="https://media.btnexus.net/DMD/7859220230608174548.jpg" alt="King855" width="100%" />
                                </div>
                                <div className="row promo-text" style={{ display: 'none' }}>
                                    <div className="col-12" style={{ whiteSpace: 'pre-line' }}>
                                        <p /><p><br /></p><p />
                                    </div>
                                </div>
                            </div>
                                <div className="col-12 col-md-6 promo">
                                    <div className="card card-style mb-0 mx-0">
                                        <img src="https://media.btnexus.net/DMD/8798620220905173537.jpg" alt="King855" width="100%" />
                                    </div>
                                    <div className="row promo-text" style={{ display: 'none' }}>
                                        <div className="col-12" style={{ whiteSpace: 'pre-line' }}>
                                            <p /><div id="sportpromo_cn">
                                                <p><strong>如何申请：</strong></p><p>仅适用于 MYR 帐户会员。</p><p>所有会员均有资格参与此优惠活动。</p><p>会员需在任何足球比赛中至少连胜7场，并投注至少 MYR 1000 有效投注额。</p><p>一旦会员完成上述条件，请联系我们的客服专员以领取您的奖励。</p>
                                                <p>KISS DIAMOND 将在客服验证成功后的 24 小时内以发放奖金至会员账户。</p><p><br /></p><p><strong>条款与条规：</strong></p><p>以上活动支持早盘以及滚球盘下注。仅有产生赢的投注将被计入连胜。如果和局或输局连胜将无效，并重新计算。</p><p>仅视1x2, 让分盘, 大/小, 单/双和有在半场/全场比赛时间内的投注为有效。任何低于0.7（马来赔率），0.7（香港/中国赔率）或 1.7（小数制）的球盘，提钱兑现和在同一场比赛中同时投注双方队伍的情况将不被视为合格投注。</p>
                                                <p>特别投注和取消比赛时的投注将不被计为连胜局，但是不影响连胜局数。</p><p>无论在任何游戏商提钱兑现或在同一场比赛中同时投注双方队伍的情况，连胜将无效，并重新计算。</p><p>同个盘口多个注单将视为一次（x1）连赢，同场比赛多个盘口给予计算连胜局数。</p><p>同一场赛事中同时下注 M8BET, OBET33 , BCSPORT 仅计算一次。7连胜局数必须来自同一个游戏商才能享有此优惠。</p><p>此优惠活动仅限于【足球】赛事。虚拟体育不包括在内。</p>
                                                <p>此优惠一天(00:00:00-23:59:59 GMT+8)内仅能申请一次。连赢场次完成后24小时内联系客服进行申请，如会员在连赢完成后24小时内未联系客服进行申请，视为主动放弃该活动奖金。</p>
                                                <p>所有送出的优惠仅限一人一份。此处所指的一人一份指的是一个家庭、住家地址、IP地址（网际协议地址）、电子邮件地址、电话号码 /电子支付、或公共电脑（例子：学校、公共图书馆或工作地点等等地点的电脑）</p><p>所有产生输赢的投注将被计算在有效投注额内，任何平局或取消的赌注皆不计算为有效投注额。</p><p>此优惠活动不可与KISS DIAMOND其他的优惠活动同时使用/进行。</p><p>KISS DIAMOND 保留可单方面执行的绝对决定权, 可以在任何时候无事先通知的情况下修改、改变此优惠活动的条件与条款/停止、终止或取消此优惠活动。</p>
                                                <p>参与此优惠活动的会员必须接受并遵守上述条款与条规以及KISS DIAMOND 的所有相关条款与条规。</p>
                                                <p>中英文版本如有歧义，概以英文版本为准。</p><p><br /></p><p><strong>优惠生效日期 ：6/9/2022 12:00:00 至 30/9/2022 23:59:59</strong></p><p><br /></p><p><strong>适用于 KISS DIAMOND 一般的条款与条规。</strong></p><p><br /></p><p>奖金</p><p>1000&nbsp;&nbsp;: 168</p><p>5000&nbsp;&nbsp;: 338</p><p>20000 : 778</p><p>50000 : 1128</p><p>88888 : 1688</p><p><br /></p></div>
                                            <div id="sportpromo_en">
                                                <p><strong>How to Apply: </strong></p><p>Only available for MYR account members.</p><p>All members are entitled to this promotion.</p><p>Members are required to win at least 7x in a row on any Soccer games and have a total minimum valid bet of MYR 1000 for all 7 and above winning streak bets.</p>
                                                <p>Once members have achieved the requirements, kindly contact Customer Support to claim your rewards.</p><p>KISS DIAMOND will issue bonuses to member accounts within 24 hours after customer service verification is successful.</p><p><br /></p>
                                                <p><strong>Term and Conditions:</strong></p><p>This promotion in only applicable for early and live match (Match already started) betting. Only the bet amount that has been settled and resulted in a winning result will be counted towards a winning streak. Draw and Lose betting results will void the winning streak.</p><p>Only applicable to 1x2, Handicap, Over/Under, Odd/Even, within half/full game will be counted towards a winning streak.</p>
                                                <p>Mix Parlay, Special Bets, and cancelation match will not be counted as winning round, however it won’t affect the existing winning streak.</p><p>Any bet below odds of 0.70 (Malay odds), 0.70 (Hong Kong/China odds), or 1.70 (Decimal odds), early redemption of bet (cash out), bet on both team in the same match will not be counted towards a winning streak.</p><p>Early redemption of bet (cash out) and bet on both team in the same match regardless of provider will void the winning streak.</p>
                                                <p>Bets on the same 1x2, Handicap, Over/Under, Odd/Even with different stake amounts will be counted as one winning streak. Bets on different 1x2, Handicap, Over/Under, Odd/Even during the same match will be counted towards a winning streak.</p><p>Bets on M8BET, OBET33 , BCSPORT providers at the same time in the same event will only be counted once. Only bets resulting in x7 winning streak in one (1) single provider will be applicable.</p><p>This offer is only limited to [Soccer] events. Virtual Sports is excluded.</p>
                                                <p>This promotion is only applicable to be claimed maximum once (1) a day (00:00:00 – 23:59:59 GMT+8). Members need to claim this bonus from Customer Service within 24 hours from the last game of a winning streak. Claims outside 24 hours after the last winning streak game will not be applicable.</p><p>All customer offers are limited to one per person. Meaning one per family, household address, IP address, email address, telephone number,&nbsp;e-payment account, or shared computer (e.g. school, public library or workplace).</p>
                                                <p>Bonuses are valid for seven (7) days upon issuance unless stated otherwise. Money won will be tranfers to the member’s account if conditions are not fulfilled within a given time frame.</p><p>Any bets resulting in void, tie, cancelled, or made on opposite sides with the same outcome will not be counted as a valid turnover.</p><p>This promotion cannot be used in conjunction with other KISS DIAMOND promotions.</p><p>KISS DIAMOND reserves the right to modify, cancel, suspend or terminate the promotion and/or change the terms of the said promotion at any time without prior notice.</p>
                                                <p>Participating members must accept and comply with all the terms mentioned above as well as all relevant rules and regulations stated on the KISS DIAMOND website.</p><p><br /></p><p><strong>Promotion Available Period ：6/9/2022 12:00:00 to 30/9/2022 23:59:59</strong></p><p><br /></p><p><strong>General KISS DIAMOND Terms &amp; Conditions apply. </strong></p><p><br /></p><p>Bonus:</p><p>1000&nbsp;&nbsp;: 168</p><p>5000&nbsp;&nbsp;: 338</p><p>20000 : 778</p><p>50000 : 1128</p><p>88888 : 1688</p></div>
                                            <div id="sportpromo_my">
                                                <p><strong>Kaedah Penyertaan: </strong></p><p>Promosi ini terbuka kepada semua ahli.</p><p>Ahli dikehendaki menang sekurang-kurangnya 7 kali berturut-turut pada mana-mana perlawanan bola sepak dan mencapai jumlah taruhan yang sah MYR 1000 dalam 7 kemenangan berturut-turut dan ke atas.</p><p>Selepas ahli memenuhi syarat, sila menghubungi Perkhidmatan Pelanggan kami untuk menuntut bonus anda.</p><p>Ganjaran akan dikreditkan dalam masa 24 jam setelah pengesahan dari Perkhidmatan Pelanggan.</p><p><br /></p><p><strong>Terma dan Syarat: </strong></p>
                                                <p>Promosi ini hanya berlaku untuk pertaruhan awal dan langsung (Perlawanan sudah dimulakan). Hanya jumlah pertaruhan yang telah diselesaikan dan menghasilkan keputusan yang menang akan dikira ke arah kemenangan berturutan. Hasil pertaruhan seri (draw) dan kalah (lose) akan membatalkan kemenangan berturutan.</p><p>Hanya berlaku untuk 1x2, Handicap, Over/Under, Ganjil/Genap, dalam separuh/penuh permainan akan dikira ke arah kemenangan berturutan. Sebarang pertaruhan di bawah kemungkinan 0.70 (kemungkinan Melayu), 0.70 (kemungkinan Hong Kong / China),&nbsp;1.70 (kemungkinan Perpuluhan), penebusan awal pertaruhan (cash out), bertaruh kedua-dua pasukan
                                                    dalam perlawanan yang sama tidak akan dikira ke arah kemenangan berturutan.</p>
                                                <p>Mix Parlay, Pertaruhan Khas, dan pertandingan dibatalkan tidak akan dikira sebagai pusingan kemenangan, namun ia tidak akan mempengaruhi rentak kemenangan berturutan yang ada.</p><p>Penebusan pertaruhan awal (cash out) dan pertaruhan kedua-dua pasukan dalam perlawanan yang sama tanpa mengira provider akan membatalkan kemenangan berturutan.</p><p>Taruhan pada 1x2, Handicap, Over/Under, Odd/Even yang sama dengan jumlah taruhan yang berbeza akan dikira sebagai satu kemenangan berturutan. Taruhan pada 1x2, Handicap, Over/Under, Ganjil/Genap semasa perlawanan yang sama akan dikira sebagai kemenangan berturutan.</p><p>Taruhan pada provider M8BET, OBET33 , BCSPORT pada masa yang sama dalam acara
                                                    yang sama hanya akan dikira sekali. Hanya pertaruhan yang menghasilkan rentak kemenangan berturutan x7 dalam satu (1) provider tunggal yang akan berlaku.</p><p>Tawaran ini hanya terhad untuk acara [Bola Sepak]. Tidak termasuk Virtual Sports.</p><p>Promosi ini hanya berlaku untuk dituntut maksimum sekali (1) sehari (00:00:00 - 23:59:59 GMT + 8). Ahli perlu menuntut bonus ini dari Perkhidmatan Pelanggan dalam masa 24 jam dari permainan terakhir kemenangan berturutan. Tuntutan di luar 24 jam selepas permainan kemenangan berturutan
                                                        terakhir tidak akan berlaku.</p><p>Semua promosi yang ditawarkan kepada pelanggan adalah seorang hanya akan mendapat satu sahaja, maksudnya satu per keluarga, alamat rumah tangga, alamat IP, alamat e-mel, nombor telefon, e-pembayaran, atau komputer awam, (contohnya sekolah, perpustakaan awam atau tempat kerja).</p><p>Hanya Taruhan yang berakhir dengan menang/kalah akan dihitung ke dalam Taruhan yang memenuhi syarat. Taruhan yang dibatalkan atau tidak berlaku dan taruhan yang dipasang pada dua kemunkinan di pertandingan tidak akan dihitung ke dalam Taruhan yang memenuhi syarat.</p><p>Promosi ini tidak sah dengan promosi lain.</p><p>KISS DIAMOND mempunyai hak untuk mengubahsuai,
                                                            membatalkan, menggantung atau menamatkan promosi dan / atau menukar syarat promosi tersebut pada bila-bila masa tanpa notis terlebih dahulu.</p><p>Ahli-ahli yang mengambil bahagian mesti menerima dan mematuhi semua terma yang dinyatakan di atas serta semua peraturan dan peraturan yang berkaitan yang dinyatakan di laman web KISS DIAMOND.</p><p>Di mana Terma dan Syarat Promosi disediakan dalam bahawa Bahasa Inggeris dan bahasan lain, sekiranya terdapat sebarang ketidakseragaman antara bahasa Inggeris dan bahasa lain, versi bahasa Inggeris hendaklah diguna pakai dan dikuatkuasakan dalam semua hal.</p>
                                                <p><br /></p><p><strong>Promotion Available Period ：6/9/2022 12:00:00 to 30/9/2022 23:59:59</strong></p><p><br /></p><p><strong>Terma dan Syarat Umum KISS DIAMOND berlaku. </strong></p><p><br /></p><p>Bonus：</p><p>1000&nbsp;&nbsp;: 168</p><p>5000&nbsp;&nbsp;: 338</p><p>20000 : 778</p><p>50000 : 1128</p><p>88888 : 1688</p></div>
                                            <p><br /></p><p><br /></p><p />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 promo">
                                    <div className="card card-style mb-0 mx-0">
                                        <img src="https://media.btnexus.net/DMD/6549720220905184608.jpg" alt="King855" width="100%" />
                                    </div>
                                    <div className="row promo-text" style={{ display: 'none' }}>
                                        <div className="col-12" style={{ whiteSpace: 'pre-line' }}>
                                            <p /><div id="live_cn">
                                                <p><strong>如何申请：</strong></p><p><br /></p><p>所有会员均有资格参与此优惠活动。</p><p>会员需在任何真人娱乐游戏中至少连胜7场, 并累积至少 MYR 1000 有效投注额。</p><p>一旦会员完成上述条件，请联系我们的客服以领取您的奖励。</p><p>KISS DIAMOND 将在客服验证成功后的 24 小时内发放奖金至会员账户。</p><p><br /></p><p><strong>条款与条规：</strong></p><p><br /></p><p>此优惠连赢仅计算百家乐游戏中的"庄"/"闲"投注玩法, 如果投注百家乐游戏的其它玩法无论输赢，连胜将无效，并重新计算。</p><p>游戏过程中如出现和局或输局，连胜将无效，并重新计算。</p><p>如果局号相同的"庄"/"闲"多次投注，该回合赢了，将视为一次（x1）连赢。</p><p>此优惠一天 (00:00:00-23:59:59 GMT+8) 内仅能申请一次。</p><p>连赢次数完成后24小时内联系客服进行申请，如会员在连赢完成后24小时内未联系客服进行申请，将视为主动放弃该活动奖金。</p><p>任何和局，取消或对赌的赌注皆不计为连胜局数。</p><p>所有送出的优惠仅限一人一份。此处所指的一人一份指的是一个家庭、住家地址、IP地址（网际协议地址）、电子邮件地址、电话号码、电子支付、或公共电脑（例子：学校、公共图书馆或工作地点等等地点的电脑）。</p><p>此优惠活动不可与KISS DIAMOND其他的优惠活动同时使用/进行。</p><p>KISS DIAMOND 保留可单方面执行的绝对酌情决定权, 可以在任何时候无事先通知的情况下修改、改变此优惠活动的条件与条款/停止、终止或取消此优惠活动。</p><p>参与此优惠活动的会员必须接受并遵守上述条款与条规以及KISS DIAMOND 的所有相关条款与条规。</p><p>中英文版本如有歧义，概以英文版本为准。</p><p><br /></p><p><strong>优惠生效日期 ：6/9/2022 12:00:00 至 30/9/2022 23:59:59</strong></p><p><br /></p><p><strong>适用于KISS DIAMOND一般的条款与条规。</strong></p><p><br /></p><p>奖金</p><p><br /></p><p>1000&nbsp;&nbsp;: 168</p><p>5000&nbsp;&nbsp;: 338</p><p>20000 : 778</p><p>50000 : 1128</p><p>88888 : 1688</p></div>
                                            <div id="live_en">
                                                <p><strong>How to apply:</strong></p><p><br /></p><p>All members are entitled to this promotion.</p><p>Members are required to win at least 7x in a row on any Live Baccarat games and have a total minimum valid bet of MYR 1000 for all 7 and above winning streak bets.</p><p>Once members have achieved the requirements, kindly contact Customer Service to claim your rewards.</p><p>KISS DIAMOND will issue bonuses to member accounts within 24 hours after customer service verification is successful.</p><p><br /></p><p><strong>Term and Conditions:</strong></p><p><br /></p><p>Only bets on banker or player are applicable for this promo, side bets will not be counted towards a winning streak and side bets resulting in win/loss will void the winning streak.</p><p>Bets resulting in a tie or lose will void the winning streak.</p><p>Multiple bets on banker or player on the same table round will only be considered as one times (x1) winning streak if the round results in a win.</p><p>This promotion is only applicable to be claimed maximum once (1) a day (00:00:00 – 23:59:59 GMT+8).</p><p>Members need to claim this bonus from Customer Service within 24 hours from the last game of a winning streak. Claims outside 24 hours after the last winning streak game will not be applicable.</p><p>Any bets resulting in void, tie, cancelled, or made on opposite sides with the same outcome will not be counted as a winning streak.</p><p>All customer offers are limited to one per person. Meaning one per family, household address, IP address, email address, telephone number, e-payment account, or shared computer (e.g. school, public library or workplace).</p><p>Bonuses are valid for seven (7) days upon issuance unless stated otherwise. Money won&nbsp;will be tranfer to member’s account if conditions are not fulfilled within a given time frame.</p><p>This promotion cannot be used in conjunction with other KISS DIAMOND promotions.</p><p>KISS DIAMOND reserves the right to modify, cancel, suspend or terminate the promotion and/or change the terms of the said promotion at any time without prior notice.</p><p>Participating members must accept and comply with all the terms mentioned above as well as all relevant rules and regulations stated on the KISS DIAMOND website.</p><p><br /></p><p><strong>Promotion Available Period ：6/9/2022 12:00:00 to 30/9/2022 23:59:59</strong></p><p><br /></p><p><strong>General KISS DIAMOND Terms &amp; Conditions apply.</strong></p><p><br /></p><p>Bonus</p><p><br /></p><p>1000&nbsp;&nbsp;: 168</p><p>5000&nbsp;&nbsp;: 338</p><p>20000 : 778</p><p>50000 : 1128</p><p>88888 : 1688</p></div>
                                            <div id="live_my">
                                                <p><strong>Kaedah Penyertaan:</strong></p><p><br /></p><p>Promosi ini terbuka kepada semua ahli.</p><p>Ahli dikehendaki menang sekurang-kurangnya 7 kali berturut-turut pada mana-mana permainan Live Baccarat dan mencapai jumlah taruhan yang sah MYR 1000 dalam 7 kemenangan berturut-turut dan ke atas.</p><p>Selepas ahli memenuhi syarat, sila menghubungi Perkhidmatan Pelanggan kami untuk menuntut bonus anda.</p><p>Ganjaran akan dikreditkan dalam masa 24 jam setelah pengesahan dari Perkhidmatan Pelanggan.</p><p><br /></p><p><strong>Terma dan Syarat:</strong></p><p><br /></p><p>Hanya pertaruhan pada "banker" atau "player" akan layak untuk promosi ini, pertaruhan sampingan tidak akan dikira ke arah rentak kemenangan berturutan dan pertaruhan sampingan yang mengakibatkan kemenangan/kekalahan akan membatalkan kemenangan berturutan.</p><p>Taruhan yang menghasilkan seri atau kalah akan membatalkan kemenangan berturutan.</p><p>Pelbagai pertaruhan pada "banker" atau "player" pada pusingan meja yang sama hanya akan dianggap sebagai satu kali (x1) kemenangan berturutan jika pusingan menghasilkan kemenangan.</p><p>Promosi ini hanya berlaku untuk dituntut maksimum sekali (1) sehari (00:00:00 - 23:59:59 GMT + 8).</p><p>Ahli perlu menuntut bonus ini dari Perkhidmatan Pelanggan dalam masa 24 jam dari permainan terakhir kemenangan berturutan. Tuntutan di luar 24 jam selepas permainan kemenangan berturutan terakhir tidak akan berlaku.</p><p>Sebarang pertaruhan yang mengakibatkan kekalahan, seri, dibatalkan, atau dibuat di seberang dengan hasil yang sama tidak akan dikira ke arah kemenangan berturutan.</p><p>Semua promosi yang ditawarkan kepada pelanggan adalah seorang hanya akan mendapat satu sahaja, maksudnya satu per keluarga, alamat rumah tangga, alamat IP, alamat e-mel, nombor telefon, e-pembayaran, atau komputer awam, (contohnya sekolah, perpustakaan awam atau tempat kerja).</p><p>Promosi ini tidak sah dengan promosi lain.</p><p>KISS DIAMOND mempunyai hak untuk mengubahsuai, membatalkan, menggantung atau menamatkan promosi dan / atau menukar syarat promosi tersebut pada bila-bila masa tanpa notis terlebih dahulu.</p><p>Ahli-ahli yang mengambil bahagian mesti menerima dan mematuhi semua terma yang dinyatakan di atas serta semua peraturan dan peraturan yang berkaitan yang dinyatakan di laman web KISS DIAMOND.</p><p>Di mana Terma dan Syarat Promosi disediakan dalam bahawa Bahasa Inggeris dan bahasan lain, sekiranya terdapat sebarang ketidakseragaman antara bahasa Inggeris dan bahasa lain, versi bahasa Inggeris hendaklah diguna pakai dan dikuatkuasakan dalam semua hal.</p><p><br /></p><p><strong>Promotion Available Period ：6/9/2022 12:00:00 to 30/9/2022 23:59:59</strong></p><p><br /></p><p><strong>Terma dan Syarat Umum KISS DIAMOND berlaku.</strong></p><p><br /></p><p><br /></p><p>Bonus</p><p><br /></p><p>1000&nbsp;&nbsp;: 168</p><p>5000&nbsp;&nbsp;: 338</p><p>20000 : 778</p><p>50000 : 1128</p><p>88888 : 1688</p></div>
                                            <p><br /></p><p><br /></p><p />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 promo">
                                    <div className="card card-style mb-0 mx-0">
                                        <img src="https://media.btnexus.net/DMD/5898920220922115107.png" alt="King855" width="100%" />
                                    </div>
                                    <div className="row promo-text" style={{ display: 'none' }}>
                                        <div className="col-12" style={{ whiteSpace: 'pre-line' }}>
                                            <p /><p><br /></p><p />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 promo">
                                    <div className="card card-style mb-0 mx-0">
                                        <img src="https://media.btnexus.net/DMD/8203720230104151724.jpg" alt="King855" width="100%" />
                                    </div>
                                    <div className="row promo-text" style={{ display: 'none' }}>
                                        <div className="col-12" style={{ whiteSpace: 'pre-line' }}>
                                            <p /><p><br /></p><p />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="offcanvas offcanvas-top rounded-m offcanvas-detached gradient-magenta" data-bs-backdrop="false" data-bs-scroll="true" id="transfernotice" style={{ height: 'fit-content', top: '77px' }} role="dialog">
                            <div className="gradient-magenta px-3 py-3">
                                <div className="d-flex">
                                    <div className="align-self-center">
                                        <i className="bi bi-coin font-20 pe-2 scale-box color-white" />
                                    </div>
                                    <div className="align-self-center">
                                        <h1 className="color-white font-700 font-20 mb-0 trn" data-trn-key="Accept Transfer">Accept Transfer</h1>
                                    </div>
                                </div>
                                <h5 className="color-white font-200 font-14 mt-2" style={{ letterSpacing: '0px' }}><t data-trn-key="You have a">You have a</t> <span className="font-600 color-yellow-light" id="tamt" /> <t data-trn-key="credit transfer from">credit transfer from</t>
                                    <span className="font-600 color-yellow-light" id="tfrom" /> <t data-trn-key="with">with</t><br /> <span className="font-600 color-yellow-light" id="tturnover" /> <t data-trn-key="turnover requirement.">turnover requirement.</t></h5>
                                <h5 className="color-white font-200 font-14 mb-3 trn" style={{ letterSpacing: '0px' }} data-trn-key="Do you want to accept it?">Do you want to accept it?</h5>
                                <div className="d-flex w-100 justify-content-between">
                                    <button className="transfer_action btn btn-full btn-xs gradient-red shadow-bg shadow-bg-s trn" data-action="decline" id="transfer_decline" data-ind style={{ width: '48%' }} data-trn-key="Decline">Decline</button>
                                    <button className="transfer_action btn btn-full btn-xs gradient-mint shadow-bg shadow-bg-s trn" data-action="accept" id="transfer_accept" data-ind style={{ width: '48%' }} data-trn-key="Accept">Accept</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* END PAGE CONTENT */}
            {/* INCLUDE SIDE BAR  */}
            {/* App Side Bar */}
            <style media="screen" dangerouslySetInnerHTML={{ __html: "\n  @media screen and (max-width: 991px) {\n    .pcsidebar {\n      display: none !important;\n    }\n    #mobile_header {\n      display: block !important;\n    }\n    .catslider_app {\n      display: block !important;\n    }\n    .catslider_pc {\n      display: none !important;\n    }\n    #footer-bar {\n      margin-left: 0;\n    }\n  }\n  @media screen and (min-width: 991px) {\n    .pcsidebar {\n      display: block !important;\n    }\n    .pcview {\n      margin-left: 310px;\n    }\n    #mobile_header {\n      display: none !important;\n    }\n    .catslider_app {\n      display: none !important;\n    }\n    .catslider_pc {\n      display: block !important;\n    }\n    #footer-bar {\n      display: none !important;\n      margin-left: 300px;\n    }\n    .pcview .header-clear-medium {\n      padding-top: 30px !important;\n    }\n    .splide__slide img {\n      vertical-align: middle !important;\n    }\n  }\n" }} />
            <div id="menu-main" style={{ width: '280px' }} className="offcanvas offcanvas-start offcanvas-detached rounded-m  SSidebar">

                <div className="bg-theme mx-3 align-items-center rounded-m shadow-m mt-3 mb-3"
                    style={{ backgroundColor: "#000000" }}
                >
                    <div className="px-2 pb-2 pt-2">
                        <div className="ps-2 align-self-center">
                            <h5 className="ps-1 mb-0 line-height-xs pt-1">
                                <img src="../imagies/kdm.gif" style={{ width: 150 }} />
                            </h5>
                        </div>
                    </div>
                </div>
                <div className="bg-theme mx-3 rounded-m shadow-m mt-3 mb-3 Title">
                    <div className="px-2 pb-2 pt-2 ">
                        <div className="ps-2 align-self-center Title">
                            <a
                                href="#"
                                data-bs-toggle="offcanvas"
                                data-bs-target="#WalletModal"
                                id="nav-comps"
                            >
                                IDR<span className="wallet ">:{balance}</span> 
                                <i
                                    className="bi bi-info-circle"
                                    style={{ color: "#AC92EC !important" }}
                                />
                            </a>
                            <h6 className="ps-1 mb-0 font-400 opacity-40" style={{ width: "20%" }}>
                                <span>{loggedInUser?.UId}</span>{" "}
                            </h6>
                        </div>
                    </div>
                </div>
                {/* <span class="menu-divider">NAVIGATION</span> */}
                <div className="menu-list">
                    <div className="card card-style rounded-m p-3 py-2 mb-0 SmSidebar">
                        <a
                            href="#"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#DepositSelectMethod"
                            id="nav-homes"
                        >
                            <i className="gradient-mint shadow-bg shadow-bg-xs bi bi-coin" />
                            <span className="trn" data-trn-key="Deposit">
                                Deposit
                            </span>
                            <i className="bi bi-chevron-right" />
                        </a>
                        <a
                            href="#"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#WithdrawMethod"
                            onclick="get_turnover();"
                            id="nav-homes"
                        >
                            <i className="gradient-orange shadow-bg shadow-bg-xs bi bi-box-arrow-up" />
                            <span className="trn" data-trn-key="Withdraw">
                                Withdraw
                            </span>
                            <i className="bi bi-chevron-right" />
                        </a>
                        <a href="#"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#BetHistoryModal"
                            id="nav-comps">
                            <i className="gradient-pink shadow-bg shadow-bg-xs bi bi-clock-history" />
                            <span className="trn" data-trn-key="Promotion">
                                History
                            </span>
                            <i className="bi bi-chevron-right" />
                        </a>
                        {/*<a href="/promotion/" id="nav-comps"><i class="gradient-red shadow-bg shadow-bg-xs bi bi-gift-fill"></i><span class="trn">Reward</span><i class="bi bi-chevron-right"></i></a>*/}
                        {/* <a
                            href="#"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#CreditModal"
                            id="nav-comps"
                        >
                            <i className="gradient-red shadow-bg shadow-bg-xs bi bi-gift-fill" />
                            <span className="trn" data-trn-key="Rewards">
                                Rewards
                            </span>
                            <i className="bi bi-chevron-right" />
                        </a> */}
                        <a
                            href="#"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#HistoryModal"
                            id="nav-comps"
                        >
                            <i className="gradient-brown shadow-bg shadow-bg-xs bi bi-clock-history" />
                            <span className="trn" data-trn-key="History">
                                Transactions
                            </span>
                            <i className="bi bi-chevron-right" />
                        </a>

                        <a
                            href="#"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#BankTransaction"
                            id="nav-comps"
                        >
                            <i className="gradient-blue shadow-bg shadow-bg-xs bi bi bi-bank2" />
                            <span className="trn" data-trn-key="History">
                                Bank Transaction
                            </span>
                            <i className="bi bi-chevron-right" />
                        </a>

                        <a
                            href="#"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#TransferCredit"
                            id="nav-comps"
                        >
                            <i className="gradient-blues shadow-bg shadow-bg-xs bi bi bi-arrow-left-right" />
                            <span className="trn" data-trn-key="History">
                                Transfer Credit
                            </span>
                            <i className="bi bi-chevron-right" />
                        </a>

                        <a
                            href="#"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#ReadBank"
                            id="nav-homes"
                        >
                            <i className="gradient-bluess shadow-bg shadow-bg-xs bi bi bi-bank2" />
                            <span className="trn" data-trn-key="Deposit">
                                Bank Account
                            </span>
                            <i className="bi bi-chevron-right" />
                        </a>

                        {/* <a href="/downline/">
                            <i className="gradient-blue shadow-bg shadow-bg-xs bi bi-people-fill" />
                            <span className="trn" data-trn-key="Downline Player">
                                Downline Player
                            </span>
                            <i className="bi bi-chevron-right" />
                        </a> */}
                        {/* <a
                            href="#"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#supportmodal"
                            id="nav-support"
                        >
                            <i className="gradient-yellow shadow-bg shadow-bg-xs bi bi-headset" />
                            <span className="trn" data-trn-key="Support">
                                Support
                            </span>
                            <i className="bi bi-chevron-right" />
                        </a> */}
                        {/* <a
                            href="#"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#QrModal"
                            id="nav-invitation"
                        >
                            <i className="gradient-magenta shadow-bg shadow-bg-xs bi bi-qr-code" />
                            <span className="trn" data-trn-key="Invitation">
                                Invitation
                            </span>
                            <i className="bi bi-chevron-right" />
                        </a> */}
                        <a href="#" id="nav-mails" onclick="switch_lang()">
                            <i className="gradient-teal shadow-bg shadow-bg-xs bi bi-translate" />
                            <span className="trn" data-trn-key="Lang">
                                Language
                            </span>
                            <i className="bi bi-chevron-right" />
                        </a>
                        <a href="/instruction/">
                            <i className="gradient-red shadow-bg shadow-bg-xs bi bi-card-image" />
                            <span className="trn" data-trn-key="Instruction">
                                Instruction
                            </span>
                            <i className="bi bi-chevron-right" />
                        </a>
                        <a  id="nav-mails" style={{cursor:'pointer'}} onClick={() => setLogoutModal(true)}>
                            <i className="gradient-dark shadow-bg shadow-bg-xs bi bi-box-arrow-left" />
                            <span className="trn"  >
                                Logout
                            </span>
                            <i className="bi bi-chevron-right" />
                        </a>
                        {/* <a href="#" data-bs-toggle="offcanvas" data-bs-target="#DepositSelectMethod" id="nav-homes"><i className="gradient-mint shadow-bg shadow-bg-xs bi bi-coin" /><span className="trn" data-trn-key="Deposit">Deposit</span><i className="bi bi-chevron-right" /></a>
                        <a href="#" data-bs-toggle="offcanvas" data-bs-target="#WithdrawMethod" id="nav-homes"><i className="gradient-blue shadow-bg shadow-bg-xs bi bi-box-arrow-up" /><span className="trn" data-trn-key="Withdraw">Withdraw</span><i className="bi bi-chevron-right" /></a>

                        <a id="nav-mails" data-bs-toggle="offcanvas" data-bs-target="#TransferModal"><i className="gradient-magenta shadow-bg shadow-bg-xs bi bi-arrow-left-right" /><span className="trn" data-trn-key="Transfer">Transfer</span><img className="ms-2" src="https://m.kissdiamond.net/images/new.png" alt="" style={{ width: '35px', filter: 'invert(42%) sepia(39%) saturate(5807%) hue-rotate(328deg) brightness(91%) contrast(86%)' }} /><i className="bi bi-chevron-right" /></a>
                        <a id="nav-mails" data-bs-toggle="offcanvas" data-bs-target="#ResetPinCodeModal"><i className="gradient-red shadow-bg shadow-bg-xs bi bi-bootstrap-reboot" /><span className="trn" data-trn-key="Reset PinCode">Reset PinCode</span><img className="ms-2" src="images/new.png" alt="" style={{ width: '35px', filter: 'invert(42%) sepia(39%) saturate(5807%) hue-rotate(328deg) brightness(91%) contrast(86%)' }} /><i className="bi bi-chevron-right" /></a>
                        <hr className="my-1 mx-2" style={{ backgroundColor: '#b6b6b6' }} />
                        <a href="/cash_history/" id="nav-pages"><i className="gradient-yellow shadow-bg shadow-bg-xs bi bi-clock-history" /><span className="trn" data-trn-key="Transaction History">Transaction History</span><i className="bi bi-chevron-right" /></a>
                        <a href="#" data-bs-toggle="offcanvas" data-bs-target="#bethistory" id="nav-comps"><i className="gradient-orange shadow-bg shadow-bg-xs bi bi-clock-history" /><span className="trn" data-trn-key="Bet History">Bet History</span><i className="bi bi-chevron-right" /></a>
                        <a href="#" data-bs-toggle="offcanvas" data-bs-target="#ProfileModal" id="nav-homes"><i className="gradient-pink shadow-bg shadow-bg-xs bi bi bi-bank2" /><span className="trn" data-trn-key="Bank Account">Bank Account</span><i className="bi bi-chevron-right" /></a>
                        <a href="/downline/"><i className="gradient-mint shadow-bg shadow-bg-xs bi bi-people-fill" /><span className="trn" data-trn-key="Downline Player">Downline Player</span><i className="bi bi-chevron-right" /></a>
                        <hr className="my-1 mx-2" style={{ backgroundColor: '#b6b6b6' }} />
                        <a href="#" id="nav-mails" ><i className="gradient-blue shadow-bg shadow-bg-xs bi bi-translate" /><span className="trn" data-trn-key="Lang">Language</span><i className="bi bi-chevron-right" /></a>
                        <a href="/instruction/"><i className="gradient-magenta shadow-bg shadow-bg-xs bi bi-card-image" /><span className="trn" data-trn-key="Instruction">Instruction</span><i className="bi bi-chevron-right" /></a>
                        <a href="" data-bs-toggle="offcanvas" id="nav-comps" data-bs-target="#DepositSelectMethod"><i className="gradient-red shadow-bg shadow-bg-xs bi bi-gift-fill" /><span className="trn" data-trn-key="Promotion">Promotion</span><i className="bi bi-chevron-right" /></a>
                        <a href="/login.html?logout=1" id="nav-mails"><i className="gradient-dark shadow-bg shadow-bg-xs bi bi-box-arrow-left" /><span className="trn" data-trn-key="Logout">Logout</span><i className="bi bi-chevron-right" /></a> */}
                    </div>
                    <div className="mt-3 mb-3 p-3 py-2" style={{ opacity: '0.5' }}>
                        <small><small>
                        </small></small>
                    </div>
                </div>
            </div>

            <style media="screen" dangerouslySetInnerHTML={{ __html: "\n  .pcsidebar {\n    width:280px;\n    position: fixed;\n    margin: 10px;\n    left: 10px;\n    top: calc(10px + env(safe-area-inset-top));\n    bottom: calc(10px + env(safe-area-inset-bottom));\n    background: linear-gradient(338deg, #a690de3d, #fcfaff);\n    backdrop-filter: blur(10px);\n    -webkit-backdrop-filter: blur(10px);\n    box-shadow: 0 -5px 5px 0 rgb(0 0 0 / 4%);\n  }\n  .pc_wallet{\n    top: 2px;\n    margin-right: 27px;\n    float: right;\n    border: 1px solid;\n    border-color: #dbd1f3;\n    padding: 3px 12px;\n    font-size: 15px;\n    border-radius: 10px;\n    /* font-weight: bold; */\n    color: #a58de1 !important;\n    position: relative;\n  }\n  @media screen and (max-width: 991px) {\n    #pc_main {\n      display: none !important;\n    }\n    #mobile_main {\n      display: flex !important;\n    }\n    #footer-bar {\n      margin-left: 0;\n    }\n  }\n  @media screen and (min-width: 991px) {\n    #pc_main {\n      display: flex !important;\n    }\n    #mobile_main {\n      display: none !important;\n    }\n    #footer-bar {\n      display: none !important;\n      margin-left: 300px;\n    }\n  }\n" }} />
            {/* App side bar */}
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.css" />
            <style media="screen" dangerouslySetInnerHTML={{ __html: "\n\n.playerbutton {\n\n  background-color: transparent;\n\n  color: #222222;\n\n  width: fit-content;\n\n  border: 2px solid #818181;\n\n  padding: 0 10px;\n\n  border-radius: 10px;\n\n  font-size: 12px;\n\n  text-transform: uppercase;\n\n}\n\n.playerbutton:active,.playerbutton:focus {\n\n  background-color: transparent; /* Green */\n\n  border-color: #92c659;\n\n}\n\n.transfer_slider .swiper-wrapper .swiper-slide {\n\n  width: auto !important;\n\n  padding: 0 5px 10px 0;\n\n}\n\n#qrcode_transfer img {\n\n  max-width: 250px;\n\n  margin: 0 auto;\n\n}\n\n.processdiv {\n\n  position: absolute;\n\n  width: 100%;\n\n  top: 0;\n\n  background: #fdfdfd;\n\n  z-index: 99;\n\n  pointer-events: none;\n\n  height: 100%;\n\n  display: flex;\n\n  flex-direction: column;\n\n  justify-content: center;\n\n  align-items: center;\n\n}\n\n#TransferModal #turnover_requirement {\n\n  border: 1px solid #ced4da;\n\n  background: #e9ecef;\n\n}\n\n" }} />
            {/* 1 transfer model */}
            <div className="offcanvas offcanvas-bottom" style={{ width: '100%', height: '100%', display: 'block' }} id="TransferModal">
                <div className="d-flex m-3">
                    <div className="align-self-center">
                        <h4 className="font-700 mb-0 trn" data-trn-key="Transfer">Transfer</h4>
                    </div>
                    <div className="align-self-center ms-auto">
                        <a href="#" className="icon icon-xs me-n2" data-bs-dismiss="offcanvas">
                            <i className="bi bi-x-circle-fill color-highlight font-14" />
                        </a>
                    </div>
                </div>
                <div className="card card-style pb-0">
                    <div className="content">
                        {/* <div id="reader" class="mx-auto"></div> */}
                        <form id="transferform" method="post">
                            <div className="d-flex">
                                <button type="button" id="changeinput" data-input="tel" data-now="user" className="btn btn-xs gradient-dark ms-auto mb-3 font-10 trn" data-trn-key="Transfer with tel">Transfer with tel</button>
                            </div>
                            <input type="hidden" name="transfer_method" />
                            <input type="hidden" id="bonus_hidden" name="bonus" defaultValue="N/A" required />
                            <div className="form-custom form-label form-border form-icon mb-1 bg-transparent" id="usernamediv">
                                <i className="bi bi-people font-13" />
                                <input id="customer" type="text" className="form-control rounded-xs customer d-inline" name="customer" placeholder="Enter receiver's username" required data-ph-trn-key="Enter receiver's username" />
                                <label htmlFor="c1" className="color-theme form-label-always-active trn d-inline" data-trn-key="Username">Username</label>
                                <span className="trn" data-trn-key="(required)">(required)</span>
                            </div>
                            <div className="form-custom form-label form-border form-icon mb-3 bg-transparent" id="teldiv" style={{ display: 'none' }}>
                                <i className="bi bi-telephone-fill font-13" />
                                <div className style={{ display: 'inline' }}>
                                    <select className="form-select rounded-xs" name="country_code" style={{ display: 'inline', width: '28%' }} id="transfer_country_code">
                                        <option selected value={60}>+60</option>
                                        <option value={91}>+91</option>
                                        <option value={65}>+65</option>
                                        <option value={66}>+66</option>
                                        <option value={62}>+62</option>
                                        <option value={61}>+61</option>
                                        <option value={86}>+86</option>
                                        <option value={852}>+852</option>
                                        <option value={853}>+853</option>
                                    </select>
                                </div>
                                <div className style={{ display: 'inline' }}>
                                    <input name="tel" type="tel" className="form-control rounded-xs" id="transfer_phone_number" placeholder="Phone" style={{ display: 'inline', width: '70%', paddingLeft: '15px !important' }} autoComplete="nope" required data-ph-trn-key="Phone" />
                                    <label htmlFor="transfer_phone_number" className="color-theme form-label-always-active trn" data-trn-key="Phone">Phone</label>
                                    <span className="trn" data-trn-key="(required)">(required)</span>
                                </div>
                            </div>
                            <div className="swiper transfer_slider mb-2 swiper-initialized swiper-horizontal swiper-backface-hidden" id="nameswiper">
                                <div className="swiper-wrapper" id="swiper-wrapper-25b73293046102cbf" aria-live="polite">
                                </div>
                                <span className="swiper-notification" aria-live="assertive" aria-atomic="true" /></div>
                            <div className="form-custom form-label form-border form-icon mb-2 bg-transparent">
                                <i className="bi bi-currency-dollar font-13" />
                                <input type="number" className="form-control rounded-xs" name="amount" placeholder="Transfer Amount" required data-ph-trn-key="Transfer Amount" />
                                <label htmlFor="c1" className="color-theme form-label-always-active trn" data-trn-key="Amount">Amount</label>
                                <span className="trn" data-trn-key="(required)">(required)</span>
                            </div>
                            <div className="d-flex flex-row align-items-center">
                                <div className="form-switch ios-switch switch-green switch-xs me-2 ms-n4">
                                    <input type="checkbox" className="ios-input" id="reset_turnover" defaultValue="ticked" name="reset_turnover" />
                                    <label className="custom-control-label trn" htmlFor="reset_turnover" data-trn-key />
                                </div>
                                <label className="font-10 trn" htmlFor="reset_turnover" data-trn-key="Reset turnover requirement">Reset turnover requirement</label>
                            </div>
                            <input type="hidden" name="updateuser" />
                            <button id="transferbtn" type="button" className="btn btn-full gradient-green mt-3 text-uppercase w-100 trn" name="button" disabled data-trn-key="Submit">Submit</button>
                        </form>
                        <div id="transfer_append" className="mt-3 text-center">
                            <small className="trn" data-trn-key="Checking turnover, please wait <i class=&quot;bi bi-hourglass-split&quot;></i>">Checking turnover, please wait <i className="bi bi-hourglass-split" /></small>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2 Enter pinCode */}
            <div className="offcanvas offcanvas-bottom rounded-m offcanvas-detached bg-theme pincodemodal" id="EnterPinCodeModal">
                <div className="d-flex mx-3 my-2">
                    <div className="align-self-center">
                        <h4 className="font-700 mb-0 trn" data-trn-key="Enter your pin">Enter your pin</h4>
                    </div>
                    <div className="align-self-center ms-auto">
                        <a href="#" className="icon icon-xs me-n2" data-bs-dismiss="offcanvas">
                            <i className="bi bi-x-circle-fill color-highlight font-14" />
                        </a>
                    </div>
                </div>
                <div className="divider mb-0" />
                <div className="content">
                    <div className="text-center pt-3 pb-2" id="pincodeform">
                        <form id="enterpinform" method="post" className="mb-3 d-flex flex-nowrap justify-content-around">
                            <input id="firstcode" className="otp text-center font-24 font-900" type="password" pattern="[0-9]*" inputMode="numeric" maxLength={1} defaultValue name="code[]" />
                            <input className="otp text-center font-24 font-900" type="password" pattern="[0-9]*" inputMode="numeric" maxLength={1} defaultValue name="code[]" />
                            <input className="otp text-center font-24 font-900" type="password" pattern="[0-9]*" inputMode="numeric" maxLength={1} defaultValue name="code[]" />
                            <input className="otp text-center font-24 font-900" type="password" pattern="[0-9]*" inputMode="numeric" maxLength={1} defaultValue name="code[]" />
                            <input className="otp text-center font-24 font-900" type="password" pattern="[0-9]*" inputMode="numeric" maxLength={1} defaultValue name="code[]" />
                            <input id="lastcode" className="otp text-center font-24 font-900" pattern="[0-9]*" inputMode="numeric" maxLength={1} type="password" defaultValue name="code[]" />
                        </form>
                        <a className="color-highlight trn" data-bs-toggle="offcanvas" data-bs-target="#ResetPincodeModal" data-trn-key="Forget Pincode?">Forget Pincode?</a>
                    </div>
                    <div className="text-center processdiv pt-3 pb-2" id="processing" style={{ display: 'none' }}>
                        <div className="spinner-border color-highlight mb-3" role="status" />
                        <p className="trn" data-trn-key="Transferring...">Transferring...</p>
                    </div>
                </div>
            </div>

            {/* 3 set New pincode */}
            <div className="offcanvas offcanvas-bottom rounded-m offcanvas-detached bg-theme pincodemodal" id="FirstPinCodeModal">
                <div className="d-flex mx-3 my-2">
                    <div className="align-self-center">
                        <h4 className="font-700 mb-0 trn" data-trn-key="Create pin for transfer credit">Create pin for transfer credit</h4>
                    </div>
                    <div className="align-self-center ms-auto">
                        <a href="#" className="icon icon-xs me-n2" data-bs-dismiss="offcanvas">
                            <i className="bi bi-x-circle-fill color-highlight font-14" />
                        </a>
                    </div>
                </div>
                <div className="divider mb-0" />
                <div className="content">
                    <div className="text-center mb-3 pt-3 pb-2">
                        <form id="firstpinform" method="post" className="d-flex flex-nowrap justify-content-around">
                            <input id="firstcode2" className="otp text-center font-24 font-900" type="password" pattern="[0-9]*" inputMode="numeric" maxLength={1} defaultValue name="code[]" />
                            <input className="otp text-center font-24 font-900" type="password" maxLength={1} pattern="[0-9]*" inputMode="numeric" defaultValue name="code[]" />
                            <input className="otp text-center font-24 font-900" type="password" maxLength={1} pattern="[0-9]*" inputMode="numeric" defaultValue name="code[]" />
                            <input className="otp text-center font-24 font-900" type="password" maxLength={1} pattern="[0-9]*" inputMode="numeric" defaultValue name="code[]" />
                            <input className="otp text-center font-24 font-900" type="password" maxLength={1} pattern="[0-9]*" inputMode="numeric" defaultValue name="code[]" />
                            <input id="lastcode2" className="otp text-center font-24 font-900" type="password" pattern="[0-9]*" inputMode="numeric" maxLength={1} defaultValue name="code[]" />
                        </form>
                    </div>
                </div>
            </div>

            {/* 3 Confirm password */}
            <div className="offcanvas offcanvas-bottom rounded-m offcanvas-detached bg-theme pincodemodal" id="SecondPinCodeModal">
                <div className="d-flex mx-3 my-2">
                    <div className="align-self-center">
                        <h4 className="font-700 mb-0 trn" data-trn-key="Please Re-enter your pin">Please Re-enter your pin</h4>
                    </div>
                    <div className="align-self-center ms-auto">
                        <a href="#" className="icon icon-xs me-n2" data-bs-dismiss="offcanvas">
                            <i className="bi bi-x-circle-fill color-highlight font-14" />
                        </a>
                    </div>
                </div>
                <div className="divider mb-0" />
                <div className="content">
                    <div className="text-center mb-3 pt-3 pb-2">
                        <form id="secondpinform" method="post" className="d-flex flex-nowrap justify-content-around">
                            <input id="firstcode3" className="otp text-center font-24 font-900" type="password" pattern="[0-9]*" inputMode="numeric" maxLength={1} defaultValue name="code[]" />
                            <input className="otp text-center font-24 font-900" type="password" pattern="[0-9]*" inputMode="numeric" maxLength={1} defaultValue name="code[]" />
                            <input className="otp text-center font-24 font-900" type="password" pattern="[0-9]*" inputMode="numeric" maxLength={1} defaultValue name="code[]" />
                            <input className="otp text-center font-24 font-900" type="password" pattern="[0-9]*" inputMode="numeric" maxLength={1} defaultValue name="code[]" />
                            <input className="otp text-center font-24 font-900" type="password" pattern="[0-9]*" inputMode="numeric" maxLength={1} defaultValue name="code[]" />
                            <input id="lastcode3" className="otp text-center font-24 font-900" type="password" pattern="[0-9]*" inputMode="numeric" maxLength={1} defaultValue name="code[]" />
                        </form>
                    </div>
                </div>
            </div>

            {/* Reset pincode */}
            <div className="offcanvas offcanvas-bottom" style={{ width: '100%', height: '100%', display: 'block' }} id="ResetPinCodeModal">
                <div className="d-flex m-3">
                    <div className="align-self-center">
                        <h4 className="font-700 mb-0 trn" data-trn-key="Reset PinCode">Reset PinCode</h4>
                    </div>
                    <div className="align-self-center ms-auto">
                        <a href="#" className="icon icon-xs me-n2" data-bs-dismiss="offcanvas">
                            <i className="bi bi-x-circle-fill color-red-dark font-14" />
                        </a>
                    </div>
                </div>
                <div className="card card-style p-3 pb-4">
                    <div className="text-center mx-3">
                        <form id="resetpinform" method="post">
                            <input type="hidden" name="phone_number" id="resetpin_phno" defaultValue={60125208525} />
                            <img src="https://m.kissdiamond.net/images/sms.png" alt="OTP" width="100%" />
                            <h4 className="mt-n2 mb-3 color-black"><span className="trn" data-trn-key="6-digits otp code will send to">Kod OTP 6 digit akan dihantar ke</span> 60125208525</h4>
                            <button className="btn btn-s gradient-red shadow-bg shadow-bg-s trn" style={{ width: '35%' }} type="button" name="button" id="resetpinotp" data-trn-key="SEND">SEND</button>
                            <div className="pincode_div" style={{ display: 'none' }}>
                                <div className="form-custom my-4 bg-transparent" style={{ width: '50%', margin: 'auto' }}>
                                    <input type="number" name="code" className="form-control text-center font-22" placeholder="••••••" required data-ph-trn-key="••••••" />
                                </div>
                                <button type="submit" className="btn btn-full gradient-green shadow-bg shadow-bg-s mt-4 w-100 trn" id="resetpincodebtn" data-trn-key="Reset Pin-Code">Reset Pin-Code</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Successful */}
            <div id="menuok" style={{ width: '320px' }} className="offcanvas offcanvas-modal offcanvas-detached rounded-m">
                <div className="content text-center">
                    <i style={{ fontSize: '60px' }} className="scale-box bi bi-check-circle-fill color-green-dark shadow-s rounded-circle p-0 mt-3 mb-3 d-inline-block" />
                    <h1 className="pt-3 font-24 trn" id="success_title" data-trn-key="Transfer Successful">Transfer Successful</h1>
                    <p className="font-14 color-theme" id="success_content" style={{ display: 'none' }} />
                    <a href="#" data-bs-dismiss="offcanvas" className="btn btn-full gradient-green shadow-bg shadow-bg-xs trn" data-trn-key="Okay">Okay</a>
                </div>
            </div>

            {/* Pending */}
            <div id="menupending" style={{ width: '320px' }} className="offcanvas offcanvas-modal offcanvas-detached rounded-m">
                <div className="content text-center">
                    <i style={{ fontSize: '60px' }} className="scale-box bi bi-question-circle-fill color-blue-dark shadow-s rounded-circle p-0 mt-3 mb-3 d-inline-block" />
                    <h1 className="pt-3 font-24 trn" id="pending_title" data-trn-key="Transfer Pending">Transfer Pending</h1>
                    <p className="font-14 color-theme trn" id="pending_content" data-trn-key style={{ display: 'none' }} />
                    <a href="#" data-bs-dismiss="offcanvas" className="btn btn-full gradient-blue shadow-bg shadow-bg-xs trn" data-trn-key="Okay">Okay</a>
                </div>
            </div>

            {/* Failed */}
            <div id="menufailed" style={{ width: '320px' }} className="offcanvas offcanvas-modal offcanvas-detached rounded-m">
                <div className="content text-center">
                    <i style={{ fontSize: '60px' }} className="scale-box bi bi-x-circle-fill color-red-dark shadow-s rounded-circle p-0 mt-3 mb-3 d-inline-block" />
                    <h1 className="pt-3 font-24 trn" id="error_title" data-trn-key="Transfer Failed">Transfer Failed</h1>
                    <p className="font-14 color-theme trn" id="error_content" data-trn-key style={{ display: 'none' }} />
                    {/* <a href="tel:+1 234 567 155" class="py-4 font-700 text-uppercase d-block">Tap to Call Support</a> */}
                    <a href="#" data-bs-dismiss="offcanvas" className="btn btn-full gradient-red shadow-bg shadow-bg-xs trn" data-trn-key="Okay">Okay</a>
                </div>
            </div>

            <style media="screen" dangerouslySetInnerHTML={{ __html: "\n.appBottomMenu {\n  /* box-shadow: 0 0 18px 0 rgb(255 180 0 / 43%); */\n  box-shadow: 0 0 18px 0 rgb(177 46 46 / 68%);\n  border-radius: 20px 20px 0 0;\n  background: -webkit-linear-gradient(to right, #1565C0, #b92b27) !important;\n  background: linear-gradient(to right, #1565C0, #b92b27) !important;\n}\n/* select option {\nbackground-color: #0f1117 !important;\ncolor: #fff !important;\n} */\n.toast-bar {\n  z-index: 9999 !important;\n}\n.appBottomMenu .item.active:before {\n  display: none;\n}\n.modal.action-sheet .modal-content .action-sheet-content {\n  max-height: 100%;\n}\n.iti-flag {\n  background-image: url(\"../assets/telflag/flags@2x.png\") !important;\n}\n.intl-tel-input {\n  width: 100%;\n}\n/* .form-group.basic .form-control, .form-group.basic .custom-select {\nheight:  35px;\n} */\n.bank_div {\n  text-align: center;\n  padding: 5px;\n  border: 1px solid #636363;\n  border-radius: 5px;\n}\n.bank_div.active {\n  background: #e130ff;\n  color: #ffffff;\n  border-color: #e130ff;\n}\n.bank_details {\n  padding: 18px 12px;\n  border: 1px solid #e130ff70;\n  border-radius: 6px;\n}\n.bank_details p{\n  color: #e130ff;\n  line-height: 1.5;\n  font-size: 14px;\n}\n.bank_details span {\n  color: #fff;\n}\n.flex_div {\n  display: flex;\n  justify-content: space-between;\n}\n.copy_div {\n  display:flex;\n  align-items:center;\n}\n\n.transfer_div {\n  display: flex;\n  justify-content: center;\n}\n.transfer_footer {\n  display: flex;\n  justify-content: space-between;\n  border-top: 1px solid #e2e2e2;\n  padding-top: 15px;\n}\n.transfer_btn {\n  width: 45px;\n  height: 45px;\n  padding: 10px;\n}\n.transfer_btn ion-icon {\n  margin: 0;\n}\n.transfer_input {\n  background: transparent;\n  border: none;\n  border-bottom: 1px solid #DCDCE9;\n  border-radius: 0;\n  height: 40px;\n  color: #27173E;\n  font-size: 15px;\n  padding: 0 10px;\n  width: 150px;\n  text-align: center;\n}\n.closebtn {\n  position: absolute;\n  padding: 0;\n  border-radius: 50%;\n  right: 10px;\n  top: 10px;\n  height: 30px;\n  color: #e130ff;\n}\n.closebtn ion-icon {\n  margin: 0\n}\n\n.cashbutton {\n  background-color: #d0d0d0;\n  color: #212529;\n  font-weight: 600;\n  width: 100%;\n  border: 2px solid transparent;\n  padding: 5px 0;\n  border-radius: 5px;\n  font-size: 14px;\n}\n.cashbutton:active,.cashbutton:focus {\n  background-color: transparent; /* Green */\n  border-color: #92c659;\n}\n\n.input-group .input-group-text {\n  font-size: 18px;\n  /* height: 35px; */\n}\n.left_btn {\n  position: absolute;\n  top: 10px;\n  width: fit-content;\n}\n.notice_box {\n  padding: 12px 15px;\n  background: #5757577d;\n  border-radius: 10px;\n  color: #f5af06;\n}\n.qrdiv {\n  background: url(/images/qr_bg.jpg) center no-repeat;\n  height: 300px;\n  background-size: contain;\n  display: flex;\n  flex-direction: row;\n  flex-wrap: wrap;\n  justify-content: center;\n  align-items: center;\n}\n.turnoverdiv {\n  width: 85%;\n  margin: auto;\n  border: none;\n  border-bottom: 1px solid #fff;\n  justify-content: space-between;\n  height: 35px;\n  background: #c7c7c7;\n  text-align:center;\n  border-radius:0;\n  font-weight:bold;\n  justify-content: space-between;\n  color: #222;\n}\n.turn {\n  width: 50%;\n}\n.turn p{\n  line-height: 35px;\n}\n.button_100 {\n  width:100%;\n}\n.theme-dark .form-custom label {\n  background: transparent !important;\n}\n\n.datepicker td, .datepicker th {\n  text-align: center;\n  width: 36px;\n  height: 29px;\n  -webkit-border-radius: 4px;\n  -moz-border-radius: 4px;\n  border-radius: 4px;\n  border: none;\n}\n\np.usdt_withdraw {\n  margin-bottom: 10px !important;\n}\n\n#footer-bar a:not(.btn) span {\n  opacity: 1 !important;\n  color: #5d5d5d !important;\n}\n#footer-bar a:not(.btn) i {\n  color: #5d5d5d;\n}\n\n" }} />

            {/* FOOTER */}

            <div id="footer-bar" className="footer-bar footer-bar-detached">
                <a href="#"><i className="ri-home-gear-line font-20" /><span className="trn" data-trn-key="Home">Home</span></a>
                <a href="#" data-bs-toggle="offcanvas" data-bs-target="#QrModal"><i className="ri-qr-code-line font-20" /><span className="trn" data-trn-key="Invitation">Invitation</span></a>
                <a href="#" data-bs-toggle="offcanvas" data-bs-target="#DepositSelectMethod" className="active-nav"><i className="bi bi-coin font-17" /><span className="trn" data-trn-key="Deposit">Deposit</span></a>
                <a href="#" data-bs-toggle="offcanvas" data-bs-target="#CreditModal" id="detail_ori_btn"><i className="ri-gift-line font-20" /><span className="trn" data-trn-key="Rewards">Rewards</span></a>
                <a href="#" data-bs-toggle="offcanvas" data-bs-target="#supportmodal"><i className="ri-customer-service-2-line font-20" /><span className="trn" data-trn-key="Support">Support</span></a>

            </div>

            <div id="gamenotice" style={{ width: '320px' }} className="offcanvas offcanvas-modal offcanvas-detached rounded-m">
                <div className="content text-center">
                    {/* <i style="font-size:65px;" class="scale-box bi bi-check-circle-fill color-green-dark shadow-s rounded-circle p-0 mt-3 mb-3 d-inline-block"></i> */}
                    <h1 className="trn" data-trn-key="2022 世界杯期间">2022 世界杯期间</h1>
                    <p className="font-14 mb-0 trn" data-trn-key="串烧比分，优胜冠军">串烧比分，优胜冠军</p>
                    <p className="font-14 mb-0 trn" data-trn-key="最高赔300k">最高赔300k</p>
                    <p className="font-14 mb-0 trn" data-trn-key="其他非世界杯赛事">其他非世界杯赛事</p>
                    <p className="font-14 mb-0 trn" data-trn-key="最高赔5k">最高赔5k</p>
                    <h1 className="pt-3 font-18 trn" data-trn-key="2022 FIFA World Cup Season">2022 FIFA World Cup Season</h1>
                    <p className="font-14 mb-0 trn" data-trn-key="Max Payout 300k">Max Payout 300k</p>
                    <p className="font-14 mb-0 trn" data-trn-key="Other Non-World Cup match">Other Non-World Cup match</p>
                    <p className="font-14 mb-2 trn" data-trn-key="Max Payout 5k ">Max Payout 5k </p>
                    <a href="#" id="gotopage" className="btn btn-full gradient-green shadow-bg shadow-bg-xs trn" data-trn-key="I Agree">I Agree</a>
                </div>
            </div>

            <div id="gamewarning" style={{ width: '320px' }} className="offcanvas offcanvas-modal offcanvas-detached rounded-m">
                <div className="content text-center">
                    <i className="scale-box bi bi-exclamation-triangle-fill color-yellow-dark p-0 mt-3 mb-3 d-inline-block font-45" />
                    <p className="font-14 mb-2 trn" data-trn-key="任何的机器人投注，对冲投注等等不正常投注，游戏公司和KISS DIAMOND将保留删除不正常投注的权利，或冻结提款的权利，或冻结账号的权利。">任何的机器人投注，对冲投注等等不正常投注，游戏公司和KISS DIAMOND将保留删除不正常投注的权利，或冻结提款的权利，或冻结账号的权利。</p>
                    <p className="font-14 mb-3 trn" data-trn-key="KISS DIAMOND 是为了提供每一位玩家以及每一位股东一个平衡的游戏平台。感谢大家的支持，也希望您可以理解。">KISS DIAMOND 是为了提供每一位玩家以及每一位股东一个平衡的游戏平台。感谢大家的支持，也希望您可以理解。</p>
                    <a href="#" id="topage" className="btn btn-full gradient-green shadow-bg shadow-bg-xs trn" data-trn-key="I Agree">I Agree</a>
                </div>
            </div>

            <div className="offcanvas offcanvas-modal rounded-m offcanvas-detached bg-theme " style={{ width: '340px' }} id="NoticeModal">
                <div className="content">
                    <div className="d-flex pb-2">
                        <div className="align-self-center">
                            <h1 className="font-700">Notice</h1>
                        </div>
                        <div className="align-self-center ms-auto">
                            <a href="#" data-bs-dismiss="offcanvas" className="icon icon-m"><i className="bi bi-x-circle-fill color-red-dark font-18 me-n4" /></a>
                        </div>
                    </div>
                    <div id="noticediv">
                        <input type="hidden" name="notice_num" id="notice_num" data-ind={1} />
                        <input type="hidden" name="notice_count" id="notice_count" defaultValue={0} />
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <center>
                                <button id="prevbtn" type="button" className="btn pbtn mt-2 trn" data-trn-key="<i class=&quot;bi bi-chevron-left&quot;></i>"><i className="bi bi-chevron-left" /></button>
                                <button id="nextbtn" type="button" className="btn pbtn ml-5 mt-2 trn" data-trn-key="<i class=&quot;bi bi-chevron-right&quot;></i>"><i className="bi bi-chevron-right" /></button>
                            </center>
                        </div>
                    </div>
                </div>
            </div>

            <InvitionModal />
            {/* Register Model */}

            <div id="RegisterModal" className="offcanvas offcanvas-modal rounded-m offcanvas-detached bg-theme" style={{ width: '340px' }} aria-modal="true" role="dialog">
                <div className="content">
                    <div className="d-flex pb-2">
                        <div className="align-self-center">
                            <h5 className="mb-n2 font-12 color-highlight font-700 text-uppercase pt-1 trn" data-trn-key="Welcome">Welcome</h5>
                            <h1 className="font-800 font-22 trn" data-trn-key="Register">Register</h1>
                        </div>
                        <div className="align-self-center ms-auto">
                            <a href="#" className="btn btn-xxs gradient-night" ><i className=" bi bi-translate" /> 中文 / EN</a>
                            <a href="#" data-bs-dismiss="offcanvas" className="icon icon-m"><i className="bi bi-x-circle-fill color-red-dark font-18 me-n4" /></a>
                        </div>
                    </div>
                    <form action="#" onsubmit="verify_tac(this)" method="post" data-gtm-form-interact-id={0}>
                        <div style={{ width: '500px' }} id="reader" />
                        <input type="hidden" name="merchant" defaultValue="DMD" />
                        <input defaultValue="---" type="hidden" className="form-control border-secondary" name="username" required style={{ display: 'hidden', width: '95%' }} />
                        <div className="form-custom form-label form-border form-icon mb-3 bg-transparent">
                            <i className="bi bi-person-check-fill font-17" />
                            <input name="afid" type="text" id="real_afid2" className="form-control rounded-xs" placeholder="Player Affiliate" data-ph-trn-key="Player Affiliate" />
                            <label htmlFor="c17" className="color-theme"> </label>
                            <span className="trn" data-trn-key="Affiliate">Affiliate</span>
                        </div>
                        <div className="form-custom form-label form-border form-icon mb-3 bg-transparent">
                            <i className="bi bi-telephone-fill font-13" />
                            <div className style={{ display: 'inline' }}>
                                <select className="form-select rounded-xs" name="country_code" style={{ display: 'inline', width: '28%' }} id="register_country_code">
                                    <option selected value={60}>+60</option>
                                    <option value={91}>+91</option>
                                    <option value={65}>+65</option>
                                    <option value={66}>+66</option>
                                    <option value={62}>+62</option>
                                    <option value={61}>+61</option>
                                    <option value={86}>+86</option>
                                    <option value={852}>+852</option>
                                    <option value={853}>+853</option>
                                </select>
                            </div>
                            <div className style={{ display: 'inline' }}>
                                <input name="tel" type="tel" className="form-control rounded-xs" id="register_phone_number" placeholder="Phone" style={{ display: 'inline', width: '70%', paddingLeft: '15px !important' }} autoComplete="nope" required data-ph-trn-key="Phone" />
                                <label htmlFor="register_phone_number" className="color-theme">Phone</label>
                                <span className="trn" data-trn-key="(required)">(required)</span>
                            </div>
                        </div>
                        <div className="form-custom form-label form-border form-icon mb-3 bg-transparent">
                            <i className="bi bi-file-check font-17" />
                            <input name="tac" type="number" className="form-control rounded-xs" id="tac" placeholder="******" autoComplete="nope" required style={{ letterSpacing: '10px', width: '60%', display: 'inline' }} data-ph-trn-key="******" />
                            <a className="btn btn-xxs gradient-green trn" id="sendcode" style={{ padding: '5px 10px !important', float: 'right', marginTop: '10px' }} data-trn-key="Send Code">Send Code</a>
                        </div>
                        <div className="form-custom form-label form-border form-icon mb-3 bg-transparent">
                            <i className="bi bi-person-circle font-17" />
                            <input name="fullname" type="text" className="form-control rounded-xs" id="c18" placeholder="Full Name (same as bank a/c)" minLength={6} autoComplete="nope" required data-ph-trn-key="Full Name (same as bank a/c)" data-gtm-form-interact-field-id={0} />
                            <label htmlFor="c18" className="color-theme">Full Name (same as bank a/c)</label>
                            <span className="trn" data-trn-key="(required)">(required)</span>
                        </div>
                        <input defaultValue="1700-01-01" name="dob" type="hidden" className="form-control rounded-xs" id="c24" placeholder="Date of Birth" data-ph-trn-key="Date of Birth" />
                        <div className="form-custom form-label form-border form-icon mb-4 bg-transparent">
                            <i className="bi bi-asterisk font-13" />
                            <input name="password" type="password" className="form-control rounded-xs" placeholder="Password ( min. 8 characters)" data-ph-trn-key="Password ( min. 8 characters)" data-gtm-form-interact-field-id={1} />
                            <label htmlFor="c25" className="color-theme">Password (at least 8 characters)</label>
                            <span className="trn" data-trn-key="(required)">(required)</span>
                        </div>
                        <button className="btn btn-full gradient-blue shadow-bg shadow-bg-s mt-4 button_100 trn" type="submit" id="register_btn" data-trn-key="REGISTER">REGISTER</button>
                        <div className="row">
                            <div className="col-12 text-end">
                                <a href="#" data-bs-toggle="offcanvas" data-bs-target="#LoginModal" className="font-15 color-theme opacity-90 pt-3 d-block trn" data-trn-key="Login">Login</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            {/* Register ModelEnd */}

            {/* FORGOT PASSWORD */}
            <div id="ForgotPasswordModal" className="offcanvas offcanvas-modal rounded-m offcanvas-detached bg-theme" style={{ width: '340px' }} aria-modal="true" role="dialog">
                <div className="content">
                    <div className="d-flex pb-2">
                        <div className="align-self-center">
                            {/*<h5 class="mb-n2 font-12 color-highlight font-700 text-uppercase pt-1 trn">Welcome</h5>*/}
                            <h1 className="font-800 font-22 trn" data-trn-key="Forgot Password">Forgot Password</h1>
                        </div>
                        <div className="align-self-center ms-auto">
                            <a href="#" data-bs-dismiss="offcanvas" className="icon icon-m"><i className="bi bi-x-circle-fill color-red-dark font-18 me-n4" /></a>
                        </div>
                    </div>
                    <form action="#" onsubmit="verify_tac_forget_pw(this)" method="post" data-gtm-form-interact-id={1}>
                        <div style={{ width: '500px' }} id="reader" />
                        <input type="hidden" name="merchant" defaultValue="DMD" />
                        <input defaultValue="---" type="hidden" className="form-control border-secondary" name="username" required style={{ display: 'hidden', width: '95%' }} />
                        <div className="form-custom form-label form-border form-icon mb-3 bg-transparent">
                            <i className="bi bi-telephone-fill font-13" />
                            <div className style={{ display: 'inline' }}>
                                <select className="form-select rounded-xs" name="country_code" style={{ display: 'inline', width: '28%' }} id="fg_country_code">
                                    <option selected value={60}>+60</option>
                                    <option value={91}>+91</option>
                                    <option value={65}>+65</option>
                                    <option value={66}>+66</option>
                                    <option value={62}>+62</option>
                                    <option value={61}>+61</option>
                                    <option value={86}>+86</option>
                                    <option value={852}>+852</option>
                                    <option value={853}>+853</option>
                                </select>
                            </div>
                            <div className style={{ display: 'inline' }}>
                                <input name="tel" type="tel" className="form-control rounded-xs" id="fg_tel" placeholder="Phone" style={{ display: 'inline', width: '70%', paddingLeft: '15px !important' }} autoComplete="nope" required data-ph-trn-key="Phone" />
                                <label htmlFor="fg_tel" className="color-theme">Phone</label>
                                <span className="trn" data-trn-key="(required)">(required)</span>
                            </div>
                        </div>
                        <div className="form-custom form-label form-border form-icon mb-3 bg-transparent">
                            <i className="bi bi-file-check font-17" />
                            <input name="tac2" type="number" className="form-control rounded-xs" id="tac2" placeholder="******" autoComplete="nope" required style={{ letterSpacing: '10px', width: '60%', display: 'inline' }} data-ph-trn-key="******" data-gtm-form-interact-field-id={2} />
                            <a className="btn btn-xxs gradient-green trn" id="sendcode2" style={{ padding: '5px 10px !important', float: 'right', marginTop: '10px' }} data-trn-key="Send Code">Send Code</a>
                        </div>
                        <div className="form-custom form-label form-border form-icon mb-4 bg-transparent">
                            <i className="bi bi-asterisk font-13" />
                            <input name="password" type="password" className="form-control rounded-xs" placeholder="Reset Password ( min. 8 characters)" required data-ph-trn-key="Reset Password ( min. 8 characters)" data-gtm-form-interact-field-id={3} />
                            <label htmlFor="c25" className="color-theme trn" data-trn-key="Reset Password (at least 8 characters)">Reset Password (at least 8 characters)</label>
                            <span className="trn" data-trn-key="(required)">(required)</span>
                        </div>
                        <button className="btn btn-full gradient-orange shadow-bg shadow-bg-s mt-4 button_100 trn" type="submit" data-trn-key="Reset">Reset</button>
                    </form>
                </div>
            </div>

            <div className="offcanvas offcanvas-bottom rounded-m offcanvas-detached" id="newversiontmodal" aria-hidden="true">
                <div className="gradient-magenta px-3 py-3">
                    <div className="d-flex mt-1">
                        <div className="align-self-center">
                            <i className="bi bi-info-circle-fill font-22 pe-2 scale-box color-white" />
                        </div>
                        <div className="align-self-center">
                            <h1 className="font-800 color-white mb-0">New version app</h1>
                        </div>
                    </div>
                    <p className="color-white opacity-80 pt-2 mb-3">Great News! Our new version app is released. You may download our latest version app now!</p>
                    <a href="/download/" className="default-link btn btn-full btn-s bg-white color-black">Go To Download</a>
                </div>
            </div>

            <div id="LoginModal" className="offcanvas offcanvas-modal rounded-m offcanvas-detached bg-theme" style={{ width: '340px' }} aria-modal="true" role="dialog" data-bs-keyboard="false">
                <div className="content">
                    <div className="d-flex pb-2">
                        <div className="align-self-center">
                            <h5 className="mb-n2 font-12 color-highlight font-700 text-uppercase pt-1 trn" data-trn-key="Welcome">Welcome</h5>
                            <h1 className="font-800 font-22 trn" data-trn-key="Login">Login</h1>
                        </div>
                        <div className="align-self-center ms-auto">
                            <a href="#" className="btn btn-xxs gradient-night" ><i className=" bi bi-translate" /> 中文 / EN</a>
                            <a href="#" data-bs-dismiss="offcanvas" className="icon icon-m"><i className="bi bi-x-circle-fill color-red-dark font-18 me-n4" /></a>
                        </div>
                    </div>

                    <form action="#" onsubmit="return login_submit(this)" method="post" id="login_form">
                        <div className="form-custom form-label form-border form-icon mb-3 bg-transparent">
                            <i className="bi bi-person-circle font-13" />
                            <div className style={{ display: 'inline' }}>
                                <select className="form-select rounded-xs" name="country_code" style={{ display: 'inline', width: '28%' }} id="country_code">
                                    <option selected value={60}>+60</option>
                                    <option value={91}>+91</option>
                                    <option value={65}>+65</option>
                                    <option value={66}>+66</option>
                                    <option value={62}>+62</option>
                                    <option value={61}>+61</option>
                                    <option value={86}>+86</option>
                                    <option value={852}>+852</option>
                                    <option value={853}>+853</option>
                                </select>
                            </div>
                            <div className style={{ display: 'inline' }}>
                                <input name="player" type="tel" className="form-control rounded-xs" id="phone_number" autoComplete="nope" placeholder="Phone" style={{ display: 'inline', width: '70%', paddingLeft: '15px !important' }} required data-ph-trn-key="Phone" />
                                <label htmlFor="phone_number" className="color-theme trn" data-trn-key="Phone">Phone</label>
                                <span className="trn" data-trn-key="(required)">(required)</span>
                            </div>
                        </div>
                        <div className="form-custom form-label form-border form-icon mb-4 bg-transparent">
                            <i className="bi bi-asterisk font-13" />
                            <input name="pwd" type="password" className="form-control rounded-xs" id="login_pwd" placeholder="Password" autoComplete="false" required data-ph-trn-key="Password" />
                            <label htmlFor="login_pwd" className="color-theme trn" data-trn-key="Password">Password</label>
                            <span className="trn" data-trn-key="(required)">(required)</span>
                        </div>
                        <button className="btn btn-full gradient-blue shadow-bg shadow-bg-s mt-4 button_100 trn" type="submit" data-trn-key="SIGN IN">SIGN IN</button>
                    </form>
                    <div className="row">
                        <div className="col-6 text-start">
                            <a href="#" data-bs-toggle="offcanvas" data-bs-target="#ForgotPasswordModal" className="font-11 color-theme opacity-40 pt-3 d-block trn" data-trn-key="Forgot Password?">Forgot Password?</a>
                        </div>
                        <div className="col-6 text-end">
                            <a href="#" data-bs-toggle="offcanvas" data-bs-target="#RegisterModal" className="font-14 color-theme opacity-90 pt-3 d-block trn" id="reg_btn1" data-trn-key="Register">Register</a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Login Action Sheet */}
            {/* DEposit Select MEthod modal */}


            <SupportModal />

            <DepositModal />

            <WithdrawModal />

            <TransferCredit />


            {/* USDT Withdrow modal */}
            <div id="UsdtWithdrawModal" className="offcanvas offcanvas-end bg-theme">
                <div className="content">
                    <div className="d-flex pb-2">
                        <div className="align-self-center">
                            {/* <h5 class="mb-n2 font-12 color-highlight font-700 text-uppercase pt-1">Deposit</h5> */}
                            <h1 className="font-800 font-22 trn" data-trn-key="USD-T Withdrawal">USD-T Withdrawal</h1>
                        </div>
                        <div className="align-self-center ms-auto">
                            <a href="#" data-bs-dismiss="offcanvas" className="icon icon-m"><i className="bi bi-x-circle-fill color-red-dark font-18 me-n4" /></a>
                        </div>
                    </div>
                    <div id="append_withdraw_usdt" className="mt-2" style={{ width: '100%' }}>
                        <small className="trn" data-trn-key="Checking turnover, please wait <i class=&quot;bi bi-hourglass-split&quot;></i>">Checking turnover, please wait <i className="bi bi-hourglass-split" /></small>
                    </div>
                    <form id="usdtwithdraw_form" name="usdtwithdraw_form" className action encType="multipart/form-data" onsubmit="usdt_withdraw_submit(this)" method="post">
                        <input type="hidden" id="usdtrate_wit_js" name="usdtrate_wit_js" defaultValue="4.62" />
                        <div className="form-custom form-label form-border form-icon mb-3 bg-transparent">
                            <i className="bi bi-currency-exchange" />
                            <input type="text" className="form-control rounded-xs trn" id="usdtrate_wit" name="rate" defaultValue="USDT Rate 4.62 (1 USDT = RM 4.62)" placeholder disabled data-trn-key data-ph-trn-key />
                            <label htmlFor="usdtrate" className="color-theme">USDT Withdraw Rate</label>
                        </div>
                        <div className="form-custom form-label form-border form-icon mb-3 bg-transparent">
                            <i className="bi bi-currency-dollar" />
                            <input type="text" className="form-control rounded-xs trn" id="dp_result_wit" name="dp_result" defaultValue="RM 0.00" placeholder={0.00} disabled data-trn-key data-ph-trn-key={0.00} />
                            <label htmlFor="usdtrate" className="color-theme">dp_result</label>
                        </div>
                        <div className="form-custom form-label form-border form-icon mb-3 bg-transparent">
                            <i className="bi bi-currency-bitcoin font-13" />
                            <input type="number" className="form-control rounded-xs" id="usdtwith_amount" name="crypto_amount" placeholder="Please indicate amount" min={25} max={10000} required data-ph-trn-key="Please indicate amount" />
                            <span className="trn" data-trn-key="(<t>minimum</t> USD-T 25)">(<t data-trn-key="minimum">minimum</t> USD-T 25)</span>
                        </div>
                        <div className="form-custom form-label form-border form-icon mb-3 bg-transparent">
                            <i className="bi bi-bank2 font-13" />
                            <input type="text" className="form-control rounded-xs" id="usdtwith_address" name="address" placeholder="Please indicate TRC-20 Address" required data-ph-trn-key="Please indicate TRC-20 Address" />
                        </div>
                        <div className="offcanvas offcanvas-bottom rounded-m offcanvas-detached" id="withdrawconfirm_usdt" style={{ bottom: 'calc(43px + env(safe-area-inset-bottom))' }}>
                            <div className="content mt-n2">
                                <h2 className="font-800 font-22 mt-2 mb-0 pt-3 trn" data-trn-key="Are you sure want to withdraw?">Are you sure want to withdraw?</h2>
                                <p style={{ display: 'none' }} />
                                <div className="row">
                                    <div className="col-6">
                                        <a href="#" className="btn btn-s text-uppercase rounded-xs font-11 font-700 btn-full btn-border border-fade-green color-green-dark trn" aria-label="Close" data-trn-key="Cancel">Cancel</a>
                                    </div>
                                    <div className="col-6">
                                        <button href="#" style={{ width: '100%' }} className="btn btn-s text-uppercase rounded-xs font-11 font-700 btn-full btn-border bg-green-dark color-green-dark trn" aria-label="Close" data-trn-key="Confirm">Confirm</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <center>
                            <button href="#" className="btn btn-full gradient-green shadow-bg shadow-bg-s mt-4 trn" id="withdraw_btn_usdt" style={{ width: '100%' }} disabled data-trn-key="Submit">Submit</button>
                        </center>
                    </form>
                    <center>
                    </center>
                    <div className="card card-style bg-fade2-blue mt-5">
                        <div className="content">
                            <small className="color-blue-dark">
                                <p className="usdt_withdraw color-highlight">Remarks:</p>
                                <p className="usdt_withdraw color-highlight" style={{ fontWeight: 'bold', lineHeight: 1 }}>USD-T address will be tie down after first successful withdrawal.</p>
                                <p className="usdt_withdraw color-highlight" style={{ fontWeight: 'bold' }}>Top up USD-T, Withdrawal USD-T ✔</p>
                                <p className="usdt_withdraw color-highlight" style={{ fontWeight: 'bold' }}>Top up RM, withdrawal USD-T ✘</p> {/*- <br><span class='trn'>Currently withdraw</span> <span>0</span> <span class='trn'>times</span>*/}
                                <p className="usdt_withdraw color-highlight" style={{ lineHeight: 1 }}>Valid withdrawal amount<br />USD-T 25 - USD-T 10,000 </p>
                                <p className="usdt_withdraw color-highlight" style={{ lineHeight: 1 }}>Maximum withdrawal 3 times per day.<br />If exceeded, will be subjected to a 3% withdrawal fee.</p>
                            </small>
                        </div>
                    </div>
                </div>
            </div>
            {/* USDT Withdrow modal End */}

            {/* 81 pay Withdrow modal */}
            <div id="Pay81WithdrawModal" className="offcanvas offcanvas-end bg-theme">
                <div className="content">
                    <div className="d-flex pb-2">
                        <div className="align-self-center">
                            {/* <h5 class="mb-n2 font-12 color-highlight font-700 text-uppercase pt-1">Deposit</h5> */}
                            <h1 className="font-800 font-22 trn" data-trn-key="81PAY Withdraw">81PAY Withdraw</h1>
                        </div>
                        <div className="align-self-center ms-auto">
                            <a href="#" data-bs-dismiss="offcanvas" className="icon icon-m"><i className="bi bi-x-circle-fill color-red-dark font-18 me-n4" /></a>
                        </div>
                    </div>
                    <div id="append_withdraw_81" className="mt-2" style={{ width: '100%' }}>
                        <small className="trn" data-trn-key="Checking turnover, please wait <i class=&quot;bi bi-hourglass-split&quot;></i>">Checking turnover, please wait <i className="bi bi-hourglass-split" /></small>
                    </div>
                    <form className action encType="multipart/form-data" onsubmit="pay81_withdraw_submit_modal(this)" method="post">
                        <div className="form-custom form-label form-border form-icon mb-3 bg-transparent">
                            <i className="bi bi-currency-dollar font-13" />
                            <input type="number" className="form-control rounded-xs trn" placeholder="Please indicate amount" name="amount" min={10} max={300000} required data-trn-key data-ph-trn-key="Please indicate amount" />
                            <span className="trn" data-trn-key="(<t>minimum</t> RM 10)">(<t data-trn-key="minimum">minimum</t> RM 10)</span>
                        </div>
                        <div className="form-custom form-label form-border form-icon mb-3 bg-transparent">
                            {/* <i class="bi bi-person-circle font-13"></i> */}
                            <i className="bi bi-wallet2 font-13" />
                            <input type="hidden" className="form-control rounded-xs" name="bank" defaultValue="81PAY" required readOnly />
                            <input type="number" className="form-control rounded-xs" defaultValue={60125208525} required readOnly />
                            <input type="hidden" name="pay81_acc" defaultValue={60125208525} required readOnly />
                        </div>
                        <div className="offcanvas offcanvas-bottom rounded-m offcanvas-detached" id="withdrawconfirm_81" style={{ bottom: 'calc(43px + env(safe-area-inset-bottom))' }}>
                            <div className="content mt-n2">
                                <h2 className="font-800 font-22 mt-2 mb-0 pt-3 trn" data-trn-key="Are you sure want to withdraw?">Are you sure want to withdraw?</h2>
                                <p style={{ display: 'none' }} />
                                <div className="row">
                                    <div className="col-6">
                                        <a href="#" className="btn btn-s text-uppercase rounded-xs font-11 font-700 btn-full btn-border border-fade-green color-green-dark trn" aria-label="Close" data-trn-key="Cancel">Cancel</a>
                                    </div>
                                    <div className="col-6">
                                        <button href="#" style={{ width: '100%' }} className="btn btn-s text-uppercase rounded-xs font-11 font-700 btn-full btn-border bg-green-dark color-green-dark trn" aria-label="Close" data-trn-key="Confirm">Confirm</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <center>
                            <button href="#" className="btn btn-full gradient-green shadow-bg shadow-bg-s mt-4 trn" id="withdraw_btn_81pay" style={{ width: '100%' }} disabled data-trn-key="Submit">Submit</button>
                        </center>
                        <br />
                        <span>* maximum withdraw limit 300k per day *</span>
                        <br />
                        <a href="https://81mpay.com/index-en.html" target="_blank" className="font-12 color-theme opacity-50 pt-3 trn" data-trn-key="No 81PAY? Download and register here">No 81PAY? Download and register here</a>
                    </form>
                </div>
            </div>
            {/* 81 pay Withdrow modal end */}

            {/* Bank transfer Modal */}

            <style media="screen" dangerouslySetInnerHTML={{ __html: "\n.bnkac{\n  text-align: center;\n  font-size: 22px !important;\n  font-weight: bold;\n  letter-spacing: 1px;\n  border: none;\n}\n.upload-file{\n  left:0px;\n}\n" }} />
            <div id="IN-HLBmodal" style={{ width: '100%' }} className="offcanvas offcanvas-end bg-theme">
                <div className="content">
                    <div className="d-flex pb-2">
                        <div className="align-self-center">
                            <h5 className="mb-n2 font-12 color-highlight font-700 text-uppercase pt-1 trn" data-trn-key="Bank Transfer">Bank Transfer</h5>
                            <h1 className="font-800 font-22">HONG LEONG BANK</h1>
                        </div>
                        <div className="align-self-center ms-auto">
                            <a href="#" data-bs-dismiss="offcanvas" className="icon icon-m"><i className="bi bi-x-circle-fill color-red-dark font-18 me-n4" /></a>
                        </div>
                    </div>
                    <div className="divider bg-green-dark divider-icon divider-s"><i className="bi bi-bank font-28 bg-green-dark rounded-xl" /></div>
                    <form method="post" encType="multipart/form-data" onsubmit="deposit_submit(this)" style={{ border: '0px', padding: 0 }}>
                        {/*-- bank config */}
                        <input type="hidden" name="bank" defaultValue="IN - HLB/31401021357" required />
                        <div className="card card-style" style={{ marginBottom: '10px' }}>
                            <div className="content text-center">
                                <h3>Hong Leong Bank</h3>
                                <h3>KAZUMA FASHION</h3>
                                <input className="form-control rounded-xs bnkac trn" defaultValue={31401021357} readOnly data-trn-key />
                            </div>
                        </div>
                        {/*-- bank config */}
                        <div className="file-data mt-1 mb-2 text-center">
                            <small className="badge gradient-yellow color-black">亲爱的用户我们只接受INSTANT TRANSFER</small><br />
                            <small className="badge gradient-yellow color-black">备注请写上账号 勿使用GIRO/IBG转账</small><br />
                            <small className="badge gradient-yellow color-black">Dear user, we accept only INSTANT TRANSFER</small><br />
                            <small className="badge gradient-yellow color-black">Fill your User ID on reference.  Do not use GIRO/IBG Bank transfer</small><br />
                            <div id="imgupload" className="img-fluid rounded-s" style={{ textAlign: 'center', marginBottom: '10px' }}>
                            </div>
                            {/* <img id="image-data" src="images/empty.png" class="img-fluid rounded-s" alt="img"> */}
                            <span className="upload-file-name d-block text-center" data-text-before="<i class='bi bi-check-circle-fill color-green-dark pe-2'></i> Image:" data-text-after=" is ready.">
                            </span>
                            <div>
                                <input type="file" className="upload-file" name="file[]" multiple accept="image/*;capture=camera" required />
                                <p className="btn btn-full btn-m text-uppercase font-700 rounded-s upload-file-text bg-dark trn" data-trn-key="Upload Bank Slip">Upload Bank Slip</p>
                            </div>
                        </div>
                        <div className="form-custom form-label form-border form-icon mb-3 bg-transparent">
                            <i className="bi bi-calendar font-13" />
                            <input type="text" className="form-control rounded-xs" id="datepicker" name="datetime" defaultValue="11-07-2023" readOnly />
                            <span className="trn" data-trn-key="Deposit Date">Deposit Date</span>
                        </div>
                        <div className="form-custom form-label form-border form-icon mb-3 bg-transparent">
                            <i className="bi bi-gift font-13" />
                            <select name="bonus" className="text-input form-control">
                                <option value="DF1">No Bonus</option>
                            </select>
                            <label htmlFor="bonus" className="color-theme">Bonus</label>
                            <span>(required)</span>
                        </div>
                        <div className="form-custom form-label form-border form-icon mb-3 bg-transparent">
                            <i className="bi bi-coin font-13" />
                            <input type="number" className="form-control rounded-xs trn" name="amount" placeholder="Please indicate amount" min={20} required data-trn-key data-ph-trn-key="Please indicate amount" />
                            <label htmlFor="amount" className="color-theme">Amount</label>
                            <span className="trn" data-trn-key="(<t>minimum</t> RM20)">(<t data-trn-key="minimum">minimum</t> RM20)</span>
                        </div>
                        <span id="message" />
                        <center><button id="" href="#" className="btn btn-full gradient-green shadow-bg shadow-bg-s mt-4 trn" data-trn-key="Submit">Submit</button></center>
                    </form>
                </div>
            </div>


            <div id="IN-RHBmodal" style={{ width: '100%' }} className="offcanvas offcanvas-end bg-theme">
                <div className="content">
                    <div className="d-flex pb-2">
                        <div className="align-self-center">
                            <h5 className="mb-n2 font-12 color-highlight font-700 text-uppercase pt-1 trn" data-trn-key="Bank Transfer">Bank Transfer</h5>
                            <h1 className="font-800 font-22">RHB BANK</h1>
                        </div>
                        <div className="align-self-center ms-auto">
                            <a href="#" data-bs-dismiss="offcanvas" className="icon icon-m"><i className="bi bi-x-circle-fill color-red-dark font-18 me-n4" /></a>
                        </div>
                    </div>
                    <div className="divider bg-green-dark divider-icon divider-s"><i className="bi bi-bank font-28 bg-green-dark rounded-xl" /></div>
                    <form method="post" encType="multipart/form-data" onsubmit="deposit_submit(this)" style={{ border: '0px', padding: 0 }}>
                        {/*-- bank config */}
                        <input type="hidden" name="bank" defaultValue="IN- RHB/21231200096482" required />
                        <div className="card card-style" style={{ marginBottom: '10px' }}>
                            <div className="content text-center">
                                <h3>RHB Bank</h3>
                                <h3>KAZUMA FASHION</h3>
                                <input className="form-control rounded-xs bnkac trn" defaultValue={21231200096482} readOnly data-trn-key />
                            </div>
                        </div>
                        {/*-- bank config */}
                        <div className="file-data mt-1 mb-2 text-center">
                            <small className="badge gradient-yellow color-black">亲爱的用户我们只接受INSTANT TRANSFER</small><br />
                            <small className="badge gradient-yellow color-black">备注请写上账号 勿使用GIRO/IBG转账</small><br />
                            <small className="badge gradient-yellow color-black">Dear user, we accept only INSTANT TRANSFER</small><br />
                            <small className="badge gradient-yellow color-black">Fill your User ID on reference.  Do not use GIRO/IBG Bank transfer</small><br />
                            <div id="imgupload" className="img-fluid rounded-s" style={{ textAlign: 'center', marginBottom: '10px' }}>
                            </div>
                            {/* <img id="image-data" src="images/empty.png" class="img-fluid rounded-s" alt="img"> */}
                            <span className="upload-file-name d-block text-center" data-text-before="<i class='bi bi-check-circle-fill color-green-dark pe-2'></i> Image:" data-text-after=" is ready.">
                            </span>
                            <div>
                                <input type="file" className="upload-file" name="file[]" multiple accept="image/*;capture=camera" required />
                                <p className="btn btn-full btn-m text-uppercase font-700 rounded-s upload-file-text bg-dark trn" data-trn-key="Upload Bank Slip">Upload Bank Slip</p>
                            </div>
                        </div>
                        <div className="form-custom form-label form-border form-icon mb-3 bg-transparent">
                            <i className="bi bi-calendar font-13" />
                            <input type="text" className="form-control rounded-xs" name="datetime" defaultValue="11-07-2023" readOnly />
                            <span className="trn" data-trn-key="Deposit Date">Deposit Date</span>
                        </div>
                        <div className="form-custom form-label form-border form-icon mb-3 bg-transparent">
                            <i className="bi bi-gift font-13" />
                            <select name="bonus" className="text-input form-control">
                                <option value="DF1">No Bonus</option>
                            </select>
                            <label htmlFor="bonus" className="color-theme">Bonus</label>
                            <span>(required)</span>
                        </div>
                        <div className="form-custom form-label form-border form-icon mb-3 bg-transparent">
                            <i className="bi bi-coin font-13" />
                            <input type="number" className="form-control rounded-xs trn" name="amount" placeholder="Please indicate amount" min={20} required data-trn-key data-ph-trn-key="Please indicate amount" />
                            <label htmlFor="amount" className="color-theme">Amount</label>
                            <span className="trn" data-trn-key="(<t>minimum</t> RM20)">(<t data-trn-key="minimum">minimum</t> RM20)</span>
                        </div>
                        <span id="message" />
                        <center><button id="" href="#" className="btn btn-full gradient-green shadow-bg shadow-bg-s mt-4 trn" data-trn-key="Submit">Submit</button></center>
                    </form>
                </div>
            </div>
            {/* Bank transfer Modal END */}

            {/* Payment Gatway Modal */}
            <div
                id="PaymentGwModal"
                className="offcanvas offcanvas-bottom rounded-m offcanvas-detached bg-theme"
            >
                <div className="content">
                    <div className="d-flex pb-2">
                        <div className="align-self-center">
                            <h5 className="mb-n2 font-12 color-highlight font-700 text-uppercase pt-1">
                                Deposit
                            </h5>
                            <h1 className="font-800 font-22">Payment Gateway</h1>
                        </div>
                        <div className="align-self-center ms-auto">
                            <a href="#" data-bs-dismiss="offcanvas" className="icon icon-m">
                                <i className="bi bi-x-circle-fill color-red-dark font-18 me-n4" />
                            </a>
                        </div>
                    </div>
                    <div className="form-custom form-label form-border form-icon mb-3 bg-transparent">
                        <i className="bi bi-person-circle font-13" />
                        <input
                            type="text"
                            className="form-control rounded-xs"
                            id="c23"
                            name="amount"
                            placeholder={30}
                        />
                        <label htmlFor="c23" className="color-theme">
                            Amount
                        </label>
                        <span className="trn" data-trn-key="(required)">
                            (required)
                        </span>
                    </div>
                    <div className="form-custom form-label form-border form-icon mb-4 bg-transparent">
                        <i className="bi bi-asterisk font-13" />
                        <select className="form-select rounded-xs" id="c6">
                            <option selected="">Main Account</option>
                            <option value={1}>Savings Account</option>
                            <option value={2}>Company Account</option>
                        </select>
                    </div>
                    <a
                        href="#"
                        className="btn btn-full gradient-green shadow-bg shadow-bg-s mt-4"
                    >
                        Submit
                    </a>
                </div>
            </div>
            {/* Payment Gatway Modal End */}

            <RewardsModal />

            <HistoryModal />

            <BetHistoryModal />

            <BankTransaction />
            <ReadBank />
            <UserProfile />

            {/* Profile Modal */}
            <div id="ProfileModal" className="offcanvas offcanvas-end bg-theme">
                <div className="content">
                    <div className="d-flex pb-2">
                        <div className="align-self-center">
                            {/* <h5 class="mb-n2 font-12 color-highlight font-700 text-uppercase pt-1">Deposit</h5> */}
                            <h1 className="font-800 font-22 trn" data-trn-key="Profile">
                                Setting
                            </h1>
                        </div>
                        <div className="align-self-center ms-auto">
                            <a href="#" data-bs-dismiss="offcanvas" className="icon icon-m">
                                <i className="bi bi-x-circle-fill color-red-dark font-18 me-n4" />
                            </a>
                        </div>
                    </div>
                    <form action="#" onsubmit="user_profile_submit(this)" method="post">

                        <div className="form-custom mb-3 form-icon form-floating form-border bg-transparent">
                            <i className="bi bi-envelope-fill font-13" />
                            <input
                                type="text"
                                className="form-control rounded-xs"
                                id="c13"
                                name="fullname"
                                defaultValue="wk1234"
                                readOnly=""
                            />
                            <label
                                htmlFor="c13"
                                className="color-theme trn"
                                data-trn-key="Fullname"
                            >
                                Fullname
                            </label>
                        </div>
                        <div className="form-custom mb-3 form-icon form-floating form-border bg-transparent">
                            <i className="bi bi-bank2 font-13" />
                            <select
                                className="form-select rounded-xs"
                                id="select_bank1"
                                name="select_bank1"
                            >
                                <option value="Maybank">Maybank</option>
                                <option value="Affin Bank">Affin Bank</option>
                                <option value="Alliance Bank">Alliance Bank</option>
                                <option value="AmBank">AmBank</option>
                                <option value="BSN">BSN</option>
                                <option value="CIMB Bank">CIMB Bank</option>
                                <option value="Citibank">Citibank</option>
                                <option value="HSBC">HSBC</option>
                                <option value="Hong Leong Bank">Hong Leong Bank</option>
                                <option value="OCBC Bank">OCBC Bank</option>
                                <option value="Public Bank">Public Bank</option>
                                <option value="RHB Bank">RHB Bank</option>
                                <option value="Standard Chartered Bank">
                                    Standard Chartered Bank
                                </option>
                                <option value="U.O.B Bank">U.O.B Bank</option>
                                <option value="Bank Rakyat">Bank Rakyat</option>
                                <option value="Bank Islam">Bank Islam</option>
                                <option value="Bank Muamalat">Bank Muamalat</option>
                                <option value="Bank Pertanian / Agrobank">
                                    Bank Pertanian / Agrobank
                                </option>
                                <option value="Touch&Go">Touch&amp;Go</option>{" "}
                            </select>
                            <label htmlFor="c14" className="color-theme trn" data-trn-key="Bank">
                                Bank
                            </label>
                        </div>
                        <div className="form-custom mb-3 form-icon form-floating form-border bg-transparent">
                            <i className="bi bi-person-circle font-13" />
                            <input
                                type="text"
                                className="form-control rounded-xs"
                                id="c14"
                                name="account1"
                                defaultValue=""
                            />
                            <label
                                htmlFor="c14"
                                className="color-theme trn"
                                data-trn-key="Bank Account"
                            >
                                Bank Account
                            </label>
                        </div>
                        <br />
                        <div id="second_bank_div" style={{ display: "none" }}>
                            <div className="form-custom mb-3 form-icon form-floating form-border bg-transparent">
                                <i className="bi bi-bank2 font-13" />
                                <select
                                    className="form-select rounded-xs"
                                    id="select_bank2"
                                    name="select_bank2"
                                >
                                    <option value="Maybank">Maybank</option>
                                    <option value="Affin Bank">Affin Bank</option>
                                    <option value="Alliance Bank">Alliance Bank</option>
                                    <option value="AmBank">AmBank</option>
                                    <option value="BSN">BSN</option>
                                    <option value="CIMB Bank">CIMB Bank</option>
                                    <option value="Citibank">Citibank</option>
                                    <option value="HSBC">HSBC</option>
                                    <option value="Hong Leong Bank">Hong Leong Bank</option>
                                    <option value="OCBC Bank">OCBC Bank</option>
                                    <option value="Public Bank">Public Bank</option>
                                    <option value="RHB Bank">RHB Bank</option>
                                    <option value="Standard Chartered Bank">
                                        Standard Chartered Bank
                                    </option>
                                    <option value="U.O.B Bank">U.O.B Bank</option>
                                    <option value="Bank Rakyat">Bank Rakyat</option>
                                    <option value="Bank Islam">Bank Islam</option>
                                    <option value="Bank Muamalat">Bank Muamalat</option>
                                    <option value="Bank Pertanian / Agrobank">
                                        Bank Pertanian / Agrobank
                                    </option>
                                    <option value="Touch&Go">Touch&amp;Go</option>{" "}
                                </select>
                                <label
                                    htmlFor="c44"
                                    className="color-theme trn"
                                    data-trn-key="Second Bank Name"
                                >
                                    Second Bank Name
                                </label>
                            </div>
                            <div className="form-custom mb-3 form-icon form-floating form-border bg-transparent">
                                <i className="bi bi-person-circle font-13" />
                                <input
                                    type="text"
                                    className="form-control rounded-xs"
                                    id="c44"
                                    name="account2"
                                    defaultValue=""
                                />
                                <label
                                    htmlFor="c44"
                                    className="color-theme trn"
                                    data-trn-key="Second Bank Account"
                                >
                                    Second Bank Account
                                </label>
                            </div>
                        </div>
                        <br />
                        <div id="third_bank_div" style={{ display: "none" }}>
                            <div className="form-custom mb-3 form-icon form-floating form-border bg-transparent">
                                <i className="bi bi-bank2 font-13" />
                                <select
                                    className="form-select rounded-xs"
                                    id="select_bank3"
                                    name="select_bank3"
                                >
                                    <option value="Maybank">Maybank</option>
                                    <option value="Affin Bank">Affin Bank</option>
                                    <option value="Alliance Bank">Alliance Bank</option>
                                    <option value="AmBank">AmBank</option>
                                    <option value="BSN">BSN</option>
                                    <option value="CIMB Bank">CIMB Bank</option>
                                    <option value="Citibank">Citibank</option>
                                    <option value="HSBC">HSBC</option>
                                    <option value="Hong Leong Bank">Hong Leong Bank</option>
                                    <option value="OCBC Bank">OCBC Bank</option>
                                    <option value="Public Bank">Public Bank</option>
                                    <option value="RHB Bank">RHB Bank</option>
                                    <option value="Standard Chartered Bank">
                                        Standard Chartered Bank
                                    </option>
                                    <option value="U.O.B Bank">U.O.B Bank</option>
                                    <option value="Bank Rakyat">Bank Rakyat</option>
                                    <option value="Bank Islam">Bank Islam</option>
                                    <option value="Bank Muamalat">Bank Muamalat</option>
                                    <option value="Bank Pertanian / Agrobank">
                                        Bank Pertanian / Agrobank
                                    </option>
                                    <option value="Touch&Go">Touch&amp;Go</option>{" "}
                                </select>
                                <label
                                    htmlFor="c64"
                                    className="color-theme trn"
                                    data-trn-key="Third Bank Name"
                                >
                                    Third Bank Name
                                </label>
                            </div>
                            <div className="form-custom mb-3 form-icon form-floating form-border bg-transparent">
                                <i className="bi bi-person-circle font-13" />
                                <input
                                    type="text"
                                    className="form-control rounded-xs"
                                    id="c64"
                                    name="account3"
                                    defaultValue=""
                                />
                                <label
                                    htmlFor="c64"
                                    className="color-theme trn"
                                    data-trn-key="Third Bank Account"
                                >
                                    Third Bank Account
                                </label>
                            </div>
                        </div>
                        <button
                            type="button"
                            id="add_bank_btn"
                            className="btn btn-xs gradient-blue shadow-bg shadow-bg-s mt-4 button_100 trn"
                            data-trn-key="Add Bank"
                        >
                            Add Bank
                        </button>
                        <small
                            className="trn"
                            data-trn-key="*If any changes please contact customer service!"
                        >
                            *If any changes please contact customer service!
                        </small>
                        <button
                            href="#"
                            className="btn btn-full gradient-green shadow-bg shadow-bg-s mt-4 button_100 trn"
                            data-trn-key="Submit"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>

            {/* Profile Modal End */}

            {/* Profile Action Sheel */}
            <div
                className="modal fade action-sheet"
                id="profileSheetForm"
                tabIndex={-1}
                role="dialog"
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title trn" data-trn-key="My Profile">
                                My Profile
                            </h5>
                            <button
                                type="button"
                                name="button"
                                className="btn closebtn"
                                data-dismiss="modal"
                            >
                                <ion-icon name="close-circle" />
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="action-sheet-content">
                                <form action="#" onsubmit="user_profile_submit(this)" method="post">
                                    <input type="hidden" name="merchant" defaultValue="DMD" />
                                    <div className="form-group basic">
                                        <div className="input-wrapper">
                                            <label
                                                className="label trn"
                                                htmlFor="name"
                                                data-trn-key="User ID"
                                            >
                                                User ID
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                className="form-control"
                                                defaultValue="DZ08525"
                                                required=""
                                                readOnly=""
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group basic">
                                        <div className="input-wrapper">
                                            <label className="label trn" htmlFor="phone" data-trn-key="Tel">
                                                Mobile Number
                                            </label>
                                            <input
                                                type="tel"
                                                className="form-control"
                                                name="tel"
                                                id="phone"
                                                defaultValue={60125208525}
                                                readOnly=""
                                                required=""
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group basic">
                                        <div className="input-wrapper">
                                            <label
                                                className="label trn"
                                                htmlFor="email"
                                                data-trn-key="Email"
                                            >
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                id="email"
                                                className="form-control"
                                                required=""
                                                autoComplete="off"
                                                defaultValue=""
                                            />
                                            <small style={{ color: "red" }}>
                                                *Email can only edit once! Please edit carefully!
                                            </small>
                                        </div>
                                    </div>
                                    <div className="form-group basic">
                                        <div className="input-wrapper">
                                            <label className="label trn" htmlFor="bank" data-trn-key="Bank">
                                                Bank
                                            </label>
                                            <select
                                                id="select_bank"
                                                className="form-control"
                                                required=""
                                                name="bank"
                                            >
                                                <option value="Maybank">Maybank</option>
                                                <option value="Affin Bank">Affin Bank</option>
                                                <option value="Alliance Bank">Alliance Bank</option>
                                                <option value="AmBank">AmBank</option>
                                                <option value="BSN">BSN</option>
                                                <option value="CIMB Bank">CIMB Bank</option>
                                                <option value="Citibank">Citibank</option>
                                                <option value="HSBC">HSBC</option>
                                                <option value="Hong Leong Bank">Hong Leong Bank</option>
                                                <option value="OCBC Bank">OCBC Bank</option>
                                                <option value="Public Bank">Public Bank</option>
                                                <option value="RHB Bank">RHB Bank</option>
                                                <option value="Standard Chartered Bank">
                                                    Standard Chartered Bank
                                                </option>
                                                <option value="U.O.B Bank">U.O.B Bank</option>
                                                <option value="Bank Rakyat">Bank Rakyat</option>
                                                <option value="Bank Islam">Bank Islam</option>
                                                <option value="Bank Muamalat">Bank Muamalat</option>
                                                <option value="Bank Pertanian / Agrobank">
                                                    Bank Pertanian / Agrobank
                                                </option>
                                                <option value="Touch&Go">Touch&amp;Go</option>{" "}
                                            </select>
                                        </div>
                                        <small style={{ color: "red" }}>
                                            *Bank can only edit once! Please edit carefully!
                                        </small>
                                    </div>
                                    <div className="form-group basic">
                                        <div className="input-wrapper">
                                            <label
                                                className="label trn"
                                                htmlFor="account"
                                                data-trn-key="Bank Account Number"
                                            >
                                                Bank Account Number
                                            </label>
                                            <input
                                                type="text"
                                                name="account"
                                                className="form-control"
                                                minLength={5}
                                                required=""

                                                id="account"
                                                defaultValue=""
                                            />
                                            <small style={{ color: "red" }}>
                                                *Email can only edit once! Please edit carefully!
                                            </small>
                                        </div>
                                    </div>
                                    <input name="user_btn" type="hidden" />
                                    <div className="form-group basic">
                                        <button
                                            type="submit"
                                            className="btn btn-primary btn-block btn-lg"
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Profile Action Sheet End */}


            {/* Transfer Action Sheet */}
            <div
                className="modal fade action-sheet"
                id="transferSheetForm"
                tabIndex={-1}
                role="dialog"
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 id="transfer_header" className="modal-title">
                                Playtech
                            </h5>
                            <button
                                type="button"
                                name="button"
                                className="btn closebtn"
                                data-dismiss="modal"
                            >
                                <ion-icon name="close-circle" />
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="action-sheet-content" style={{ padding: "30px 15px" }}>
                                <div className="transfer_div">
                                    <div className="">
                                        <button
                                            className="btn btn-primary transfer_btn mr-1"
                                            type="button"
                                            name="button"
                                        >
                                            <ion-icon name="remove-outline" />
                                        </button>
                                    </div>
                                    <div className="">
                                        <input
                                            id="transfer_amount"
                                            className="transfer_input"
                                            type="number"
                                            name=""
                                            defaultValue={0}
                                            min={0}
                                        />
                                    </div>
                                    <div className="">
                                        <button
                                            className="btn btn-primary transfer_btn ml-1"
                                            type="button"
                                            name="button"

                                        >
                                            <ion-icon name="add-outline" />
                                        </button>
                                    </div>
                                </div>
                                <div className="text-center mt-1">
                                    <button
                                        type="button"
                                        name="button"
                                        className="btn btn-primary"

                                    >
                                        ALL IN
                                    </button>
                                </div>
                                <div className="transfer_footer mt-3">
                                    <div className="left">
                                        <button
                                            id="transfer_product_balance"
                                            type="button"
                                            name="button"
                                            className="btn btn-primary"

                                        >
                                            RM
                                        </button>
                                    </div>
                                    <div className="right">
                                        <button
                                            type="button"
                                            name="button"
                                            className="btn btn-primary"
                                        >
                                            Withdraw
                                        </button>
                                        <button
                                            type="button"
                                            name="button"
                                            className="btn btn-primary"
                                        >
                                            Play Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Transfer Action Sheet End */}

            {/* Default Action Sheet Inset */}
            <div
                className="modal fade action-sheet inset"
                id="noticeSheetInset"
                tabIndex={-1}
                role="dialog"
            >
                <div
                    className="modal-dialog"
                    role="document"
                    style={{ padding: 0, boxShadow: "0px -3px 8px 0px #686868" }}
                >
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Notice 注意事项</h5>
                            <button
                                type="button"
                                name="button"
                                className="btn closebtn"
                                data-dismiss="modal"
                            >
                                <ion-icon name="close-circle" />
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="section text-center mt-2 mb-2">
                                <i
                                    className="fas fa-exclamation-triangle"
                                    style={{ fontSize: 40, color: "gold" }}
                                />
                                <h4>首次存款请注意</h4>
                                <div className="notice_box mb-3">
                                    <h3>ATM Deposit 现金存款</h3>
                                    <p className="m-0">
                                        汇款后都把单打印 然后在单上面写【KISSDIAMOND casino】再拍给客服
                                        否则一律不受理
                                    </p>
                                </div>
                                <div className="notice_box mb-3">
                                    <h3>Online Banking 网上转账</h3>
                                    <p className="m-0">
                                        转账remark上面要写【products】screen shot给客服 否则一律不受理
                                    </p>
                                </div>
                                <p className="m-0">
                                    💡温馨提醒：由于总部有时会分配不一样的银行给客户充值，请您在汇款之前在我们的网站点击【存款】并查询充值户口先再充值到网站上面的户口
                                    如查询到不是充值到网站上提供的户口将一律不受理
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Default Action Sheet Inset End */}

            {/* Pending Action Sheet */}
            <div
                className="modal fade modalbox"
                id="pendingActionSheet"
                tabIndex={-1}
                role="dialog"
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Process Pending</h5>
                            <a href="javascript:;" data-dismiss="modal">
                                <ion-icon
                                    name="close-circle"
                                    style={{ fontSize: 22, display: "flex" }}
                                />
                            </a>
                        </div>
                        <div className="modal-body">
                            <div className="action-sheet-content" style={{ padding: "10px 16px" }}>
                                <p>
                                    Your previous request under process, please contact admin for more
                                    information.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Pending Action Sheet End */}

            {/* Overlimit Action Sheet  */}
            <div
                className="modal fade modalbox"
                id="overlimitActionSheet"
                tabIndex={-1}
                role="dialog"
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Process Overlimit</h5>
                            <a href="javascript:;" data-dismiss="modal">
                                <ion-icon
                                    name="close-circle"
                                    style={{ fontSize: 22, display: "flex" }}
                                />
                            </a>
                        </div>
                        <div className="modal-body">
                            <div className="action-sheet-content" style={{ padding: "10px 16px" }}>
                                <p>
                                    Withdraw Request Overlimit Per Day. <br />
                                    Please Request By Tomorrow, <br />
                                    Thank You.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Overlimit Action Sheet End */}
            <LogoutModal show={logoutModal} close={toggleLogoutModal}/>

        </>
    )
}
export default DiamondHome;