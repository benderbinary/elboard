<template>
  <div
    class="sidebar relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
    <div class="mb-2 p-4">
      <h5 class="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-gray-900">
        Elboard
      </h5>
    </div>
    <nav class="flex flex-col gap-1 min-w-[240px] p-2 font-sans text-base font-normal text-gray-700">
      <router-link to="/"
        class="flex items-center p-3 rounded-lg text-start transition-all hover:bg-blue-50 hover:text-blue-900">
        Home
      </router-link>
      <router-link to="/about"
        class="flex items-center p-3 rounded-lg text-start transition-all hover:bg-blue-50 hover:text-blue-900">
        About
      </router-link>
      <router-link to="/table"
        class="flex items-center p-3 rounded-lg text-start transition-all hover:bg-blue-50 hover:text-blue-900">
        Table
      </router-link>
    </nav>
    <ul class="flex flex-col py-4">
      <li>
        <router-link to="/"
          class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
          <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
            <i class="bx bx-home"></i>
          </span>
          <span class="text-sm font-medium">Dashboard</span>
        </router-link>
      </li>
      <li>
        <router-link to="/chat"
          class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
          <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
            <i class="bx bx-chat"></i>
          </span>
          <span class="text-sm font-medium">Chat</span>
        </router-link>
      </li>
      <li>
        <router-link to="/profile"
          class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
          <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
            <i class="bx bx-user"></i>
          </span>
          <span class="text-sm font-medium">Profile</span>
        </router-link>
      </li>
      <li>
        <router-link to="/notifications"
          class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
          <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
            <i class="bx bx-bell"></i>
          </span>
          <span class="text-sm font-medium">Notifications</span>
          <span class="ml-auto mr-6 text-sm bg-red-100 rounded-full px-3 py-px text-red-500">5</span>
        </router-link>
      </li>
      <li>
        <router-link to="/logout"
          class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
          <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
            <i class="bx bx-log-out"></i>
          </span>
          <span class="text-sm font-medium">Logout</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SidebarView'
}
</script>

<style scoped></style>

<link rel="stylesheet" href="https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css" />
