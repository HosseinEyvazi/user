const NotFound = () => {
  return (
    <>
      <section class="bg-slate-500 ">
        <div class="container min-h-screen px-6 py-12 mx-auto lg:flex lg:items-center lg:gap-12">
          <div class="w-full lg:w-1/2">
            <p class="text-sm font-medium text-blue-950">
              404 error
            </p>
            <h1 class="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
              Page not found
            </h1>
            <p class="mt-4 text-black ">
              متاسفیم . صفحه مورد نظر یافت نشد !
            </p>

            <div class="flex items-center mt-6 gap-x-3">
              
            </div>
          </div>

          <div class="relative w-full mt-12 lg:w-1/2 lg:mt-0">
            <img
              class="w-full max-w-lg lg:mx-auto"
              src="/images/components/illustration.svg"
              alt=""
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default NotFound;
