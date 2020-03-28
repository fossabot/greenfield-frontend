<template>
  <div>
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <h2 class="text-3xl font-bold leading-tight text-gray-900">
          <slot name="title" />
        </h2>

        <slot name="header" />
      </div>
    </header>
    <main>
      <div class="max-w-7xl mx-auto pb-6 sm:px-6 lg:px-8">
        <slot name="content" />
      </div>
    </main>
  </div>
</template>
