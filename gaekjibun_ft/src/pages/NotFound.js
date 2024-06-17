function NotFound() {
  return (
    <>
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-indigo-600">
            404: Page not found
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            다시 한번 확인해주세요!
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600">
            지금 입력하신 주소의 페이지는 <br/>
            사라졌거나 다른 페이지로 변경되었습니다. <br/>
            주소를 다시 확인해주세요.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="/"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              메인 화면으로
            </a>
          </div>
        </div>
      </main>
    </>
  );
}

export default NotFound;
