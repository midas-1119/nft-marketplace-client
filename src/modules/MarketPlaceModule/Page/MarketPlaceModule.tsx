import Head from "next/head";
import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../components/button/Button";
import Card from "../../../components/card/Card";
import Input from "../../../components/input/Input";
import Loader from "../../../components/loader/Loader";
import Search from "../../../components/search/Search";
import { USDG } from "../../../constants/price.constant";
import { IBuilding } from "../../../interfaces/marketplace.interface";
import { getBNBRate, getEthRate } from "../../../metamask/metamask";
import { selectUser } from "../../../store/auth/selector";
import Snackbar from '@mui/material/Snackbar';
import { getMarketplaceBuildingsAction } from "../../../store/marketplace/async.func";
import {
  selectLoading,
  selectRefetch,
} from "../../../store/marketplace/selector";
import MArketPlaceFilters from "../Components/MArketPlaceFilters";

const MarketPlaceModule = () => {
  const [show, setShow] = useState(false);
  const [areaApply, setAreaApply] = useState(false);
  const [priceIn, setPriceIn] = useState(USDG);
  const [priceApply, setPriceApply] = useState(false);
  const [loadMore, setLoadMore] = useState(true);
  const [viewAll, setViewAll] = useState<boolean>(false);
  const [next, setNext] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currType, setCurrencyType] = useState<string>("USDG");
  const [isMoreData, setIsMoreDaata] = useState<boolean>(true);
  const [range, setRange] = useState({
    rangemin: 0,
    rangemax: 0,
  });
  const [area, setArea] = useState({
    areamin: 0,
    areamax: 0,
  });
  const user = useSelector(selectUser);
  const shouldRefetch = useSelector(selectRefetch);
  // const price = useSelector(selectPriceRange);
  const dispatch = useDispatch();
  const [buildingsArr, setBuildings] = useState<IBuilding[]>([]);
  const [bnbRate, setBnbRate] = useState(1);
  const [ethRate, setEthRate] = useState(1);
  const [open, setOpen] = useState(false);
  const [state, setState] = useState({
    current_page: 1,
    pages: 1,
    total_buildings: 0,
    per_page: 1,
  });
  const [usdgexRate, setUsdgexRate] = useState(null);
  const [bnbexRate, setBnbexRate] = useState(null);
  const [ethexRate, setEthexRate] = useState(null);

  useEffect(() => {
    const fetchUsdgRate = async () => {
      const response = await fetch(
        'https://rest.coinapi.io/v1/exchangerate/USDG/USD?apikey=99A92B5F-3822-4646-8DBC-1AD04651D46C'
      );
      const data = await response.json();
      setUsdgexRate(data.rate);
    };
    fetchUsdgRate();
  }, []);

  useEffect(() => {
    const fetchBnbRate = async () => {
      const response = await fetch(
        'https://rest.coinapi.io/v1/exchangerate/BNB/USD?apikey=99A92B5F-3822-4646-8DBC-1AD04651D46C'
      );
      const data = await response.json();
      setBnbexRate(data.rate);
    };
    fetchBnbRate();
  }, []);

  useEffect(() => {
    const fetchEthRate = async () => {
      const response = await fetch(
        'https://rest.coinapi.io/v1/exchangerate/ETH/USD?apikey=99A92B5F-3822-4646-8DBC-1AD04651D46C'
      );
      const data = await response.json();
      setEthexRate(data.rate);
    };
    fetchEthRate();
  }, []);


  useEffect(() => {
    const storedValue = localStorage.getItem("currType");
    if (storedValue !== null) {
      setCurrencyType(storedValue);
    }
  }, []); // empty dependency array, so this effect only runs once on mount

  const handleSave = (value: any) => {
    localStorage.setItem("currType", value);
  };

  // const loading = useSelector(selectLoading);
  const [loading, setLoading] = useState(false);

  const fetchBuildings = async (
    page: number = 1,
    applyPrice: boolean = priceApply,
    applyArea: boolean = areaApply,
    viewAllApply: boolean = false
  ) => {
    if (viewAllApply) {
      setLoading(true);
    }
    try {
      let query: any = {
        page: page,
        search: searchTerm,
        viewAll: viewAllApply,
        // range: price
      };
      if (applyArea) {
        query = {
          ...query,
          plotMin: area.areamin,
          plotMax: area.areamax,
        };
      }
      if (applyPrice) {
        query = {
          ...query,
          priceMin: range.rangemin,
          priceMax: range.rangemax,
        };
      }
      const response = await dispatch(getMarketplaceBuildingsAction(query));

      if (response.meta && response.meta.requestStatus === "fulfilled") {
        const { buildings, ...rest } = response.payload;
        if (buildings.length === 0) setLoadMore(false);

        if (buildings.length === 0 || !!viewAllApply) {
          setIsMoreDaata(false);
        } 
        else {
          setIsMoreDaata(true);
        }

        // if (rest.current_page > 1)
        setBuildings([...buildingsArr, ...buildings]);
        // else setBuildings(buildings);
        setNext(rest.next);
        setState(rest);
      }
    } catch (err: any) {}
    setLoading(false);
  };

  const onSubmitArea = () => {
    setAreaApply(true);
    fetchBuildings(1, priceApply, true);
  };

  const onSubmitRange = () => {
    if(range.rangemin>range.rangemax){
      //notification
      setOpen(true);
      setRange({...range, rangemax:range.rangemin});
    }
    setPriceApply(true);
    fetchBuildings(1, areaApply, true);
  };

  const onClickViewAll = () => {
    setViewAll(!viewAll);
    fetchBuildings(1, priceApply, areaApply, !viewAll);
  };

  useEffect(() => {
    fetchBuildings();
  }, []);

  // useEffect(() => {
  //   fetchBuildings();
  // }, [price]);

  useEffect(() => {
    fetchBuildings(1);
  }, [shouldRefetch]);

  const handleLoadMore = () => {
    fetchBuildings(state.current_page + 1);
  };

  useEffect(() => {
    let inputOnChange: any;
    if (searchTerm) {
      inputOnChange = setTimeout(() => {
        fetchBuildings();
      }, 1500);
    }

    return () => clearTimeout(inputOnChange);
  }, [searchTerm]);

  const clearFilters = () => {
    setAreaApply(false);
    setPriceApply(false);
    setRange({ rangemin: 0, rangemax: 0 });
    setArea({ areamin: 0, areamax: 0 });
    fetchBuildings(1, false, false);
  };
  const removeItemFromCurrentList = async (index: number) => {
    const newArr = [...buildingsArr];
    newArr.splice(index, 1);
    setBuildings(newArr);
  };

  useEffect(() => {
    getRates();
  }, []);

  const getRates = async () => {
    const response = await getBNBRate();
    if (response) {
      setBnbRate(response);
    }
    const ethResponse = await getEthRate();
    if (ethResponse) {
      setEthRate(ethResponse);
    }
  };

  return (
    <div className="container">
      <Head>
        <title>Marketplace - Gameree</title>
      </Head>
      <div>
      {usdgexRate ? (
        <p>1 USDG = {usdgexRate} USD</p>
      ) : (
        <p>Loading...</p>
      )}
      {bnbexRate ? (
        <p>1 BNB = {bnbexRate} USD</p>
      ) : (
        <p>Loading...</p>
      )}
      {ethexRate ? (
        <p>1 ETH = {ethexRate} USD</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>

      <div className="flex flex-wrap items-center justify-between gap-12 mt-12 ">
        {show ? (
          <div className="flex items-center gap-4">
            <i
              className="text-2xl cursor-pointer icon-filter text-primary"
              onClick={() => setShow(!show)}
            ></i>
            <h1 className="font-TTTrailers-Regular">Marketplace</h1>
          </div>
        ) : (
          <h1 className="font-TTTrailers-Regular">Marketplace</h1>
        )}
        <Search
          value={searchTerm}
          setSearchTerm={setSearchTerm}
          placeholder="Search"
          parentClass="w-full sm:w-[30.6rem]"
        />
      </div>
      <div
        // className={`grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2  gap-7 mt-16 `}
        className={`flex flex-col md:flex-row  gap-14 mt-16 `}
      >
        <div className={` w-full md:w-[30%] lg:w-[20%] ${show && "hidden"}`}>
          <MArketPlaceFilters
            handleSave={handleSave}
            setCurrencyType={(value: any) => setCurrencyType(value)}
            currType={currType}
            handleState={setShow}
            state={show}
            area={area}
            setArea={setArea}
            range={range}
            setRange={setRange}
            onSubmitArea={onSubmitArea}
            onSubmitRange={onSubmitRange}
            clearFilters={clearFilters}
          />
        </div>
        <div
          className={` ${
            show
              ? "sm:col-span-2 lg:col-span-3  xl:col-span-4 w-full "
              : "col-span-1 lg:col-span-2 xl:col-span-3 w-full  md:w-[70%] lg:w-[80%]"
          } `}
        >
          <div className="flex justify-between mb-[2.5rem]">
            <Button
              className=" text-3xl !px-16"
              onClick={() => onClickViewAll()}
            >
              {viewAll ? `View Few` : `View All`}
            </Button>

            {buildingsArr?.length > 0 && (
              <span className=" w-60">
                <Input
                  disabled
                  placeholder={`${buildingsArr.length}`}
                  className="w-full border border-[#384E69] text-center !py-4 bg-transparent !rounded-xl text-sm font-Montserrat-Medium placeholder-[#557C9A]"
                />
                {}
              </span>
            )}
          </div>
          {!loading ? (
            <InfiniteScroll
              dataLength={buildingsArr.length} //This is important field to render the next data
              next={handleLoadMore}
              hasMore={isMoreData}
              loader={
                <div className="w-full h-[30vh] flex items-center justify-center text-white font-Montserrat-Regular text-[18px] text-opacity-50 tracking-wider">
                  <span className="mt-[3px]">Loading NFTs</span>
                  <Loader />
                </div>
              }
              endMessage={
                <div className="w-full h-[30vh] flex items-center justify-center text-white font-Montserrat-Regular text-[18px] text-opacity-50 tracking-wider">
                  <span className="mt-[3px]">No more data</span>
                </div>
              }
            >
              <div
                className={`grid gap-5 ${
                  show
                    ? " xl:grid-cols-4 lg:grid-cols-3  sm:grid-cols-2"
                    : "lg:grid-cols-2 xl:grid-cols-3"
                }`}
              >
                {buildingsArr.map((building: any, index) => {
                  let nft: any = {};
                  let isListing = false;
                  if (building.name === "ListingPlaced") {
                    isListing = true;
                    nft = { ...building.nft, ...building };
                  } else nft = building;
                  let isOwner = false;
                  // const userAcc = user?.metamaskId
                  //   ? user.metamaskId.toLowerCase()
                  //   : "";
                  const userAcc = user?._id;

                  // if (nft.status === "minted") {
                  //   isOwner = userAcc === nft.ownerAddress.toLowerCase();
                  // } else if (isListing && building.status === "PLACED") {
                  //   isOwner = userAcc === building.sender.toLowerCase();
                  // }

                  // isOwner = userAcc === nft?.ownerAddress?.toLowerCase();
                  console.log("YES: ", nft);
                  isOwner = userAcc === nft?.ownerId?._id;

                  return (
                    <>
                      <Card
                        bg="transparent"
                        nft={nft}
                        id={building._id}
                        user={user}
                        isOwner={isOwner}
                        index={index}
                        removeItemFromCurrentList={removeItemFromCurrentList}
                        currType={currType}
                        rate={
                          currType === "BNB"
                            ? bnbRate
                            : currType === "ETH"
                            ? ethRate
                            : 1
                        }
                      />
                    </>
                  );
                })}
              </div>
            </InfiniteScroll>
          ) : (
            <div className="w-full h-[30vh] flex items-center justify-center text-white font-Montserrat-Regular text-[18px] text-opacity-50 tracking-wider">
              <span className="mt-[3px] text-2xl">Loading NFTs</span>
              <Loader />
            </div>
          )}
          {/* {!loading ? (
            <></>
          ) : (
            <div className="w-full h-[30vh] flex items-center justify-center text-white font-Montserrat-Regular text-[18px] text-opacity-50 tracking-wider">
            <span className="mt-[3px]">Loading NFTs</span>
            <Loader />
            </div>
          )} */}
          {/* {!loading ? (
            <div className="text-center">
              {!loadMore ? (
                <Button
                  className="mt-[4.5rem] text-[3.5rem] !px-28 "
                  disabled={true}
                >
                  {!buildingsArr.length ? "Not Found" : "All Nft's are loaded"}
                </Button>
              ) : next ? (
                <Button
                  className="mt-[4.5rem] text-[3.5rem] !px-28 "
                  onClick={handleLoadMore}
                  isLoading={loading}
                  disabled={loading}
                >
                  Load More
                </Button>
              ) : null}
            </div>
          ) : null} */}
        </div>
      </div>
      <Snackbar open={open} onClose={() => setOpen(false)} message="sdfdsfdsfds" autoHideDuration ={1500} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} />
    </div>
  );
};

export default MarketPlaceModule;
