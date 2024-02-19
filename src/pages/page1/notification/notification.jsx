import React, { useState, useEffect, useContext } from "react";
import Header from "../../Home/components/header/Header";
import SideAd from "../../Home/components/advertisement/SideAd";
import Footer from "../../Home/components/footer/Footer";
import NotificationItem from "../notification/notification_item";
import AcountModalContainer from "../../../container/AcountModalContainer";
import axios from "axios";
import { UserContext } from "../../../context/Login";
import "./notice.scss";
import "../components/mypage/mypage.scss";

export default function Notification() {
  const [comments, setComments] = useState([]); 
  const [notificationsData, setNotificationsData] = useState([]); 
  const [isNotified, setIsNotified] = useState(false);
  const [userState, setUserstate] = useState(1);

  const [modalState, setModalState] = useState(null);
  const [modal, setModal] = useState(false);

  const user_context = useContext(UserContext);

  const userId = user_context.user_data.id;
  const isLoggedIn = user_context.user_data.isLogin;

  console.log(user_context);
  if (user_context && user_context.user_data) {
  console.log("사용자 정보: ", user_context.user_data.id); 
  } else {
  console.log("사용자 데이터가 없습니다.");
  }

  useEffect(() => {
    const user_Id = user_context.user_data.id;
    axios

      .get(`users/${userId}/notifications`)

      .then((response) => {
        setNotificationsData(response.data);
        setIsNotified(true);
      })
      .catch((error) => console.error(error));
  }, [user_context.user_data.isLogin]);

  useEffect(() => {
    console.log("notificationsData =====: ", notificationsData);
  }, [notificationsData]);

  const addComment = (newComment) => {
    setComments([...comments, newComment]);
  };

  const handleNotificationClick = () => {
    setIsNotified(false); // 알림 클릭 시, 알림 여부 상태 변경
  };

  const handleButtonClick = () => {
    // 로고 클릭 핸들러 로직
  };

  useEffect(() => {
    console.log("모달 상태 변경???: ", modalState);

    if (modalState != null) {
      setModal(true);
    } else {
      setModal(false);
    }
  }, [modalState]);

  return (
    <div>
      {modal && modalState && (
        <AcountModalContainer
          state={modalState}
          setModalState={setModalState}
        />
      )}
      <Header
        onLogoClick={handleButtonClick}
        setModalState={setModalState}
        setModal={setModal}
      />
      <div className="mypage-wrapper">
        <div className="left">
          <SideAd />
        </div>
        <div className="mypage-container">
          <div className="notifications-container">
            {notificationsData.map((notification, index) => (
              <NotificationItem
                key={index}
                sentiment_id={notification.sentiment_id}
                title={notification.title}
                read_at={notification.read_at}
                created_at={notification.created_at}
                content={notification.content}
              />
            ))}
          </div>
        </div>
        <div className="right">
          <SideAd />
        </div>
      </div>
      <Footer />
    </div>
  );
}
