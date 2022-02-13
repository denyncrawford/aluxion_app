<template>
  <div
      class="
        min-h-full
        flex flex-col
        items-center
        justify-center
        px-4
        py-12
        sm:px-6
        lg:py-16 lg:px-8
      "
    >
      <h2
        class="
          text-5xl
          md:text-8xl text-gray-400
          opacity-90
          text-center
          font-extrabold
          tracking-tight
          max-w-lg
        "
      >
        Sorry but we can't find the stop you are looking for.
        <div class="my-3"></div>
      </h2>
      <div class="flex mt-8 lg:flex-shrink-0 lg:mt-12">
        <div class="inline-flex rounded-md shadow">
          <router-link to="/" class="">Back Home</router-link>
        </div>
      </div>
    </div>
</template>
