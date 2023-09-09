import React, { useEffect, useState, ChangeEvent } from "react";
import Slider from "react-slick";
import Sidebar from "./Sidebar";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { callPostApiWithoutPayload } from './ApiCaller';
import * as ApiConst from './ApiConst';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Cookies from 'universal-cookie';

import { useBalance } from "./SidebarComponents/BalanceContext";
import Loader from "./common/Loader";
const SliderTabs = () => {

    const [launchGameData, setLaunchGameData] = useState([]);
    const [responseData, setResponseData] = useState([]);
    const [tabIndex, setTabIndex] = useState(1);
    const [tabpanelData, setTabpanelData] = useState([])
    const [tabsData, setTabsData] = useState([])
    const [loadingTabs, setLoadingTabs] = useState(false)
    const [AdsData, setAdsData] = useState([])
    const loggedInUser = new Cookies().get("kisDiamond_LoggedIn")
    const { balance } = useBalance();
    const [gameLoader, setGameLoader] = useState(false);


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
                        })
                    }
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
            });
            const jsonData = await response.json();
            if (jsonData.isSuccess) {
                let a = document.createElement('a');
                a.target = '_blank';
                a.href = jsonData.data;
                a.click();
                // console.log();
                setLaunchGameData(jsonData.data);
            } else {
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
        setGameLoader(true)
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
            });
            const jsonData = await response.json();
            if (jsonData.isSuccess) {
                setResponseData(jsonData.data);
                setGameLoader(false)
            }
        } catch (error) {
            setGameLoader(false)
            // console.log('Error:', error);
        }
    };
    //***** GET GAME API END *****/

    return (
        <>
            {/* END PAGE CONTENT */}

            <section className="pcview">
                <div className="page-content header-clear-medium">
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
                                                className="card card-style mx-0 shadow-card shadow-card-m sliderImage"
                                                data-card-height={300}
                                                style={{
                                                    backgroundImage: `url(${data.Url})`,

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
                            <div className="Tabs" style={{ cursor: 'pointer', borderRadius:'15px', backgroundColor:'#ededed' }}>
                                <Tabs selectedIndex={tabIndex} onSelect={(index) => handleTabSelect(index)}>
                                    <div className="get TabPanel" style={{ marginTop: '7px' }}>
                                        <TabList>
                                            {tabsData.length > 0 && tabsData.map((games) =>
                                                <>
                                                    <Tab >{games.Description}</Tab>
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
                                                            <a className='mx-1 provider cursor' style={{ display: "inline-block", marginRight: '10px' }} onClick={() => handleButtonClick(data.Code, data.GameTypeCode)}>{data.Name}</a>
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
                            <>
                                {responseData.length > 0 && responseData.map((data) =>
                                    <div className="col-3 p-1 game-item livecasino allgame" style={{ cursor: 'pointer' }}>
                                        <div className="card card-style rounded-s m-0">
                                            <img src="/images/process.gif" alt="" className="KING855 process" />
                                            {gameLoader ? <Loader /> :
                                                <img onClick={() => handleGameClick(data.GameCode)}
                                                    className="lazyload cursor"
                                                    data-src="./imagies/live_855.jpg"
                                                    src={data.ImageURL}
                                                    alt=""
                                                    onclick="action_live('KING855')"
                                                />
                                            }
                                        </div>
                                        <div className="game-title" >{data.GameName}</div>
                                    </div>
                                )}
                            </>

                            {/* end KING855 */}

                        </div>

                    </div>
                </div>
            </section>
        </>
    )
}

export default SliderTabs
