import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moreIcon from "../../../../assets/icons/moreicon.svg";
import "./RelatedNickname.scss";
import { NicknameFollow } from "../../../../modules/api/search";

export default function RelatedNickname({
  searchResult,
  displayedItems,
  userId,
}) {
  const isLogin = true; //추후 수정 ------
  if (!isLogin) {
    userId = "0";
  }

  const [InitialFollowStatus, setInitialFollowStatus] = useState([]);
  const [FollowStatus, setFollowStatus] = useState([]);

  useEffect(() => {
    //console.log("맨 처음 렌더링될 때 한 번만 실행");
    const sortedItems = displayedItems.nicknameObject.sort(
      (a, b) => a.user_id - b.user_id
    );
    console.log("가장 처음 팔로우 상태: ", sortedItems);

    setInitialFollowStatus(
      sortedItems.map((data) => {
        if (data.follow_status === "following") {
          return true;
        }
        if (data.follow_status === "follow") {
          return false;
        }
        if (data.follow_status === "myself") {
          return null;
        }
      })
    );
    setFollowStatus(
      sortedItems.map((data) => {
        if (data.follow_status === "following") {
          return true;
        }
        if (data.follow_status === "follow") {
          return false;
        }
        if (data.follow_status === "myself") {
          return null;
        }
      })
    );
  }, []);

  useEffect(() => {
    if (InitialFollowStatus) {
      console.log("팔로우 초기화: ", InitialFollowStatus);
    }
  }, [InitialFollowStatus]);

  const handleFollowClick = async (follower, index) => {
    if (!isLogin) {
      // 로그인 상태가 아닌 경우
      alert("로그인이 필요합니다.");
      return;
    }

    if (!follower) {
      console.error("Invalid follower object");
      return;
    }

    try {
      if (userId === follower.user_id) {
        alert("자기 자신을 팔로우할 수 없습니다.");
        return;
      } else {
        const data = await NicknameFollow(userId, follower.user_id);
        const updatedFollowStatus = [...FollowStatus]; // FollowStatus 복사
        if (data.follow_status === "following") {
          updatedFollowStatus[index] = true;
        }
        if (data.follow_status === "follow") {
          updatedFollowStatus[index] = false;
        }
        setFollowStatus(updatedFollowStatus); // 업데이트된 팔로우 상태 저장
      }
    } catch (error) {
      console.error("팔로우 오류:", error);
    }
  };

  useEffect(() => {
    if (FollowStatus) {
      console.log("팔로우 업데이트: ", FollowStatus);
    }
  }, [FollowStatus]);

  return (
    <>
      <div className="related-nickname-container">
        <div className="related-nickname-list">
          {displayedItems.nicknameObject &&
            Array.isArray(displayedItems.nicknameObject) &&
            displayedItems.nicknameObject.length > 0 &&
            displayedItems.nicknameObject
              .sort((a, b) => a.user_id - b.user_id)
              .map((follower, index) => (
                <div key={index} className="related-follower-card">
                  <img
                    src={follower.profile_image}
                    alt={follower.nickname}
                    className="related-follower-image"
                  />
                  <div className="related-follower-info">
                    <h3 className="related-follower-name">
                      {follower.nickname}
                    </h3>
                    <p className="follower-bio">{follower.status_message}</p>
                  </div>
                  <button
                    onClick={() => handleFollowClick(follower, index)} // 인덱스도 함께 전달
                    className={`follower-status ${
                      FollowStatus[index] === true
                        ? "followed"
                        : FollowStatus[index] === false
                        ? "not-followed"
                        : "null"
                    }`}
                  >
                    {FollowStatus[index] === true
                      ? "팔로잉"
                      : FollowStatus[index] === false
                      ? "팔로우"
                      : "내계정"}
                    {/* 팔로우 상태에 따라 버튼 텍스트 변경 */}
                  </button>
                </div>
              ))}
        </div>
      </div>
      <div className="more-details">
        <Link
          to={`/${searchResult.content}/related_nickname_more`}
          className="more-link"
        >
          <h3>더보기</h3>
          <img src={moreIcon} alt="moreIcon" className="more-icon" />
        </Link>
      </div>
    </>
  );
}
