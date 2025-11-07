<template>
  <div class="flex lg:flex-1">
    <router-link
      to="/"
      class="flex items-center gap-3 rounded-lg px-2 py-1 transition-all duration-300 hover:scale-105 hover:bg-gray-100/40 active:scale-95"
    >
      <img
        class="h-12 md:h-16 w-auto drop-shadow-md"
        width="300"
        height="80"
        src="/logo_ari.webp"
        alt="logo_wb"
        loading="lazy"
      />
      <span class="text-gray-400">|</span>
      <span
        class="text-2xl font-raleway font-bold bg-gradient-to-r from-purple-800 to-purple-400 bg-clip-text text-transparent"
      >
        Barbershop
      </span>
      <!-- <span class="text-3xl font-bold font-raleway">@ariwibowo</span> -->
    </router-link>
  </div>
</template>