import React, { useEffect, useState } from 'react'
import { callPostApiWithoutPayload } from '../ApiCaller';
import * as ApiConst from '../ApiConst';

const Promotion = () => {

    const [AdsData, setAdsData] = useState([])

    useEffect(() => {
        ADS();
        getADSLists();
    }, []);

    const ADS = async () => {
        try {
            callPostApiWithoutPayload(ApiConst.ADS_Post, (response) => {
                if (response.isSuccess) {
                    var options = [];
                    const adContents = response.data.filter((x) => x.Type === 3);
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
    return (
        <>
            <div className="card card-style mb-5 TransactionHistory">
                <div className="page-content header-clear-medium">
                    <div className="content mx-3 mt-0">
                        <div className="row" id="allpromotion">
                                {AdsData.length > 0 && AdsData.map((data, i) => (
                            <div className="col-12 col-md-6 promo">
                                    <div className="card card-style mb-0 mx-0">
                                        <img
                                            src={data.Url}
                                            alt="King855"
                                            width="100%"
                                        />
                                    </div>
                            </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Promotion
