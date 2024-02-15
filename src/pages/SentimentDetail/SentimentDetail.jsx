// SentimentDetail.jsx
// 나경 to 지현
// 이 파일이 홈페이지에서 센티먼트 항목 클릭하면 연결 돼요!
// 센티먼트 페이지 만들고 나중에 여기로 옮기면 될 것 같아요:)
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Header from "../Home/components/header/Header";
import SideAd from "../Home/components/advertisement/SideAd";
import Footer from "../Home/components/footer/Footer";
import CommentItem from "./Comment/Comment";
import SentimentDetailDummy from "./SentimentDetailDummy";
import axios from "axios";
import likeBlackIcon from "../../assets/icons/like_black.png";
import bookmarkBlackIcon from "../../assets/icons/bookmark_black.png";
import editIcon from "../../assets/icons/edit_Img.png";
import deleteIcon from "../../assets/icons/delete_Img.png";
import userImg from "../../assets/icons/user_Img.png";
import starIcon from "../../assets/icons/star.svg";
import bookmarkIcon from "../../assets/icons/bookmark.svg";
import commentIcon from "../../assets/icons/comment.svg";
import likeIcon from "../../assets/icons/like.svg";
import RookieIcon from "../../assets/tiers/루키.svg";
import SilverIcon from "../../assets/tiers/실버.svg";
import GoldIcon from "../../assets/tiers/골드.svg";
import DiaIcon from "../../assets/tiers/다이아.svg";
import MasterIcon from "../../assets/tiers/마스터.svg";
import GrandMasterIcon from "../../assets/tiers/그랜드마스터.svg";
import "./SentimentDetail.scss";

import insertImg from "./insert_Img.png";
import bookcover1 from "./book_image_1.svg";

export default function SentimentDetail() {
  const navigate = useNavigate();
  // 선택한 센티먼트 id와 title 변수
  const [sentimentData, setSentimentData] = useState(null);
  const { id } = useParams(); 
  console.log(id);
  const [isLoaded, setIsLoaded] = useState(false);

  // console.log("검색어가 있으면 ", content);
  // console.log(sentiment_title);

  const handleLogoClick = () => {
    navigate("/");
  };

  //티어 아이콘 색상 변경용
  const getTierIcon = (tier) => {
    const tierIcons = {
      루키: RookieIcon,
      실버: SilverIcon,
      골드: GoldIcon,
      다이아: DiaIcon,
      마스터: MasterIcon,
      그랜드마스터: GrandMasterIcon,
    };
    const DefaultIcon = () => null;
    const formattedTier = tier.toLowerCase().replace(/\s/g, "");
    const SelectedIcon = tierIcons[formattedTier] || DefaultIcon;
    return SelectedIcon;
  };

  // 페이지 이동시 스크롤바 위치 최상단으로 가도록
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

  //추천, 스크랩 버튼
  const [isRecommand, setIsRecommand] = useState(false);
  const [isScrap, setIsScrap] = useState(false);
  const handleRecommand = () => {
    setIsRecommand(!isRecommand);
  };
  const handleScrap =() => {
    setIsScrap(!isScrap);
  }


  const getSentimentData = async () => {
    try {
      const response = await axios.get(`/sentiments/${id}`);
      console.log("센티먼트 데이터 확인용", response.data);
      console.log(response);
      setSentimentData(response.data); 
      console.log(response.data[0].sentiment.sentiment_title);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  //api 가져오기 
  useEffect(() => {  
    getSentimentData();
  }, []);
  
  

  //상단 컴포넌트
  const DetailTop = ({Sentiments}) => {


  return (
    <div id="detail-top">
      {sentimentData ? (
        <>
        <div className="top-header">
          <div className="book-info-box">
            <div className="sort">Sentiment</div>
            <div className="title">{sentimentData[0].sentiment.sentiment_title}</div>
            <div className="title-author-box">
              <div className="book-title">{sentimentData[0].sentiment.book_title}</div>
              <div className="book-author">{sentimentData[0].sentiment.author}</div>
            </div>
            <div className="writer-info-box">
              <img src={userImg} alt="userImg" className="profile-image" />
              <div className="nick-date-box">
                <div className="nickname-tier">
                  <div className="nickname">{sentimentData[0].sentiment.nickname}</div>
                  <img
                    src={getTierIcon(sentimentData[0].sentiment.tier)}
                    alt="tier"
                    className="tier-icon"
                  />
                </div>
                <div className="date">{sentimentData[0].sentiment.created_at}</div>
              </div>
            </div>
          </div>
          <div className="book-image-box">
            <div className="image-box">
              <img className="image" src = {bookcover1} alt="Book Cover"/>
              <div className="rating">{sentimentData[0].sentiment.score}</div>
            </div>
          </div>
        </div>

        <div className="detail-top-main">
        <img className="detail-main-image" style={{width:"1100px", height:"1100px"}} src={insertImg} alt="책 내용 사진" />
          <div className="detail-main-text">{sentimentData[0].sentiment.content}</div>
        </div>
      </>
      )
    :(
      <p>데이터 없어용</p>
    )
    }
    </div>
  );
  }


//하단 컴포넌트
const DetailBottom = () => {


  return (
    <div id='detail-bottom'>
      <div className="update-delete-box">
        <div className="update-button">
          <img src={editIcon} alt="editIcon" className="edit-icon"/>
          <div className="edit-text">수정하기</div>
        </div>
        <div className="delete-button">
          <img src={deleteIcon} alt="deleteIcon" className="delete-icon"/>
          <div className="delete-text">삭제하기</div>
        </div>
      </div>
      <div className="bottom-button-box">
        <div className="like-box">
          <div className="like">
            <img src={likeIcon} alt="like" className="like-icon" />
            <div className="like-count">12</div>
          </div>
          <div className="comment">
            <img src={commentIcon} alt="comment" className="comment-icon"/>
            <div className="comment-count">3</div>
          </div>
          <div className="scrap">
            <img src={bookmarkIcon} alt="scrap" className="scrap-icon"/>
            <div className="scrap-count">0</div>
          </div>
        </div>
        <div className="recommand-box">
          <div className={`recommand-button ${
              isRecommand ? "recommand" : "not-recommand" }`}
                onClick={handleRecommand}>
            <img src={likeBlackIcon}  alt="likeBlack" className="recommand-black-icon"/>
            <div className="recommand-text">추천하기</div>
          </div>
          <div className={`scrap-button ${
              isScrap ? "scrap" : "not-scrap" }`}
                onClick={handleScrap}>
            <img src={bookmarkBlackIcon} alt="bookmarkBlack" className="scrap-black-icon" />
            <div className="scrap-text">스크랩</div>
          </div>
        </div>
      </div>
    </div>
    
  );
}



  return (
    <div>
      <Header onLogoClick={handleLogoClick} />
      <div className="main-content">
        {/* 1열 - 왼쪽 사이드 광고 부분 */}
        <div className="left">
          <SideAd />
        </div>

        {/* 2열 - 중앙 메인 부분 */}
        <div style={{width:'auto'}} className="center">
          <div className="contents">

            <DetailTop />
            <DetailBottom />
            <CommentItem />
          </div>
        </div>

        {/* 3열 - 오른쪽 사이드 광고 부분 */}
        <div className="right">
          <SideAd />
        </div>
      </div>
      <Footer />
    </div>
  );
}
