// Sentiment.jsx
import React, { useState } from "react";

import { Link } from "react-router-dom";
import { sentimentDummy } from "./sentimentDummy";
import starIcon from "../../../../assets/icons/star.svg";
import boockmarkIcon from "../../../../assets/icons/bookmark.svg";
import commentIcon from "../../../../assets/icons/comment.svg";
import likeIcon from "../../../../assets/icons/like.svg";
import RookieIcon from "../../../../assets/tiers/루키.svg";
import SilverIcon from "../../../../assets/tiers/실버.svg";
import GoldIcon from "../../../../assets/tiers/골드.svg";
import DiaIcon from "../../../../assets/tiers/다이아.svg";
import MasterIcon from "../../../../assets/tiers/마스터.svg";
import GrandMasterIcon from "../../../../assets/tiers/그랜드마스터.svg";
import "./Sentiment.scss";

function formatDateTime(dateTimeString) {
  const dateTime = new Date(dateTimeString);
  const year = String(dateTime.getFullYear()).slice(-2);
  const month = String(dateTime.getMonth() + 1).padStart(2, "0");
  const day = String(dateTime.getDate()).padStart(2, "0");
  const hours = String(dateTime.getHours()).padStart(2, "0");
  const minutes = String(dateTime.getMinutes()).padStart(2, "0");

  return `${year}/${month}/${day} ${hours}:${minutes}`;
}

export default function Sentiment() {
  //const searchResults = sentimentDummy;
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 3; // 한 페이지에 보이는 항목 수
  const totalItems = sentimentDummy.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // 현재 페이지에 해당하는 데이터 계산
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedItems = sentimentDummy.slice(startIndex, endIndex);

  // 페이지 번호 클릭 시 해당 페이지로 이동하는 함수
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
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

  return (
    <div>
      <div className="search-container">
        {/* 검색 결과 리스트 */}
        {displayedItems.map((result) => (
          <div key={result.id} className="search-result">
            <div className="info">
              <Link
                to={`/sentiment/${result.id}/${result.sentiment_title}`}
                className="book-link"
              >
                <img
                  src={`bookcover_dummy/${result.image_file}`}
                  alt={result.title}
                />
              </Link>
              <div className="none-img">
                <div className="detail-info">
                  <Link
                    to={`/sentiment/${result.id}/${result.sentiment_title}`}
                    className="book-link"
                  >
                    <h3>{result.sentiment_title}</h3>
                  </Link>
                  <p>
                    <strong>{result.book_title}</strong> ({result.author}/
                    {result.publisher})
                  </p>
                </div>
                <div className="additional-info">
                  <div className="nickname">
                    <p>닉네임: {result.nickname} </p>
                  </div>
                  <div className="tier">
                    <p>티어: </p>
                    <img
                      src={getTierIcon(result.tier)}
                      alt="result.tier"
                      className="tier-icon"
                    />
                  </div>
                  <div className="likes">
                    <img src={likeIcon} alt="like" className="like-icon" />
                    <p>{result.likes}</p>
                  </div>
                  <div className="comments">
                    <img
                      src={commentIcon}
                      alt="comment"
                      className="comment-icon"
                    />
                    <p>{result.comments}</p>
                  </div>
                  <div className="bookmarks">
                    <img
                      src={boockmarkIcon}
                      alt="bookmark"
                      className="bookmark-icon"
                    />
                    <p>{result.bookmarks}</p>
                  </div>
                  <p className="datetime">{formatDateTime(result.datetime)}</p>
                </div>
              </div>
            </div>
            <div className="rating-info">
              <img src={starIcon} alt="star" className="star-icon" />
              <p>{result.rating.toFixed(1)}</p>
            </div>
          </div>
        ))}
      </div>
      {/* 페이지 번호 */}

      <div className="pagination-container">
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (pageNumber) => (
              <button
                key={pageNumber}
                className={pageNumber === currentPage ? "active" : ""}
                onClick={() => handlePageChange(pageNumber)}
              >
                {pageNumber}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
}
