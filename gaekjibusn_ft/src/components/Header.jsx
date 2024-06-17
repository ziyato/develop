import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import NoticeModal from "./NoticeModal/NoticeModal";

function Header({ user, notifications }) {
  const [showModal, setShowModal] = useState(false);

  function logout() {
    sessionStorage.removeItem("user");
    window.location.href = "/";
  }

  return (
    <header className=" block h-20 top-0 z-50">
      <div className="absolute bg-gray-800 inset-x-0 z-50">
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between p-6 md:px-8 lg:px-8"
          aria-label="Global"
        >
          <div className="flex flex-row gap-9 items-center">
            <div className="flex md:flex-1 lg:flex-1">
              <a href="/" className="-m-1.5 p-1.5">
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt=""
                />
              </a>
            </div>

            <div className="flex gap-x-12">
              <Link
                to="/about"
                className="font-semibold leading-6 text-gray-300"
              >
                About
              </Link>
              <Link to="/" className="font-semibold leading-6 text-gray-300">
                나의 냉장고
              </Link>
              <Link
                to="/mypage"
                className=" font-semibold leading-6 text-gray-300"
              >
                마이페이지
              </Link>
            </div>
          </div>
          <div className="flex flex-1 justify-end gap-7 items-center">
            <div
              className="relative cursor-pointer"
              onClick={() => setShowModal(true)}
            >
              <FaBell className="text-gray-300" size={24} />
              {notifications.length > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center h-5 w-5 text-xs font-bold leading-none text-white bg-red-600 rounded-full transform translate-x-2/3 -translate-y-2/3">
                  {notifications.length}
                </span>
              )}
            </div>
            {user ? (
              <>
                <Link
                  to="/mypage"
                  className="font-semibold leading-6 text-gray-300"
                >
                  {user.username || "사용자명"}
                </Link>
                <Link
                  className="font-semibold leading-6 text-gray-300 border border-gray-300 rounded-md px-2 py-1 cursor-pointer"
                  onClick={() => logout()}
                >
                  Logout
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="font-semibold leading-6 text-gray-300"
                >
                  Sign in
                </Link>

                <Link
                  to="/signup"
                  className="font-semibold leading-6 text-gray-300 border border-gray-300 rounded-md px-2 py-1"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
      {showModal && (
        <NoticeModal
          notifications={notifications}
          onClose={() => setShowModal(false)}
        />
      )}
    </header>
  );
}

export default Header;
