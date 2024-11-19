<template>
  <div :class="colorMode.value === 'dark' ? 'bg-gray-900' :gradientClass">
    <header class="flex items-center justify-between p-4">
      <div class="text-xl font-bold font-mono" :class="colorMode.value === 'dark' ? 'text-gray-200' : 'text-black'"><a
          href="/">{{ appName }}</a></div>
      <nav>
        <ul class="flex space-x-4">
          <li><a href="#testimonials" :class="colorMode.value === 'dark' ? 'text-gray-200' : linkClass">Avis</a></li>
          <li v-if="!userEmail">
            <a href="/login" :class="colorMode.value === 'dark' ? 'text-gray-200' : linkClass">Se connecter</a>
          </li>
          <li v-if="userEmail">
            <a href="" :class="colorMode.value === 'dark' ? 'text-gray-200' : linkClass" @click.prevent="logout">Se
              déconnecter</a>
          </li>
        </ul>
      </nav>
    </header>
    <section class="text-center py-12">
      <h1 class="text-4xl font-extrabold" :class="colorMode.value === 'dark' ? 'text-white' : 'text-gray-900'">
        {{ title }}
      </h1>
      <p class="mt-4 text-lg" :class="colorMode.value === 'dark' ? 'text-gray-300' : 'text-gray-600'">
        {{ description }}
      </p>
      <div v-if="!userEmail" class="mt-6">
        <button @click="goLogin"
          :class="[`max-w-32 min-w-32 px-4 py-2 rounded-lg shadow`, colorMode.value === 'dark' ? 'bg-gray-700 text-white hover:bg-gray-600' : buttonClass]">
          S'inscrire
        </button>
      </div>
      <div class="mt-8 sm:w-[80%] lg:w-[65%] mx-auto shadow-2xl rounded-2xl mb-10">
        <img :src="imgHero" class="rounded-2xl w-full max-h-[38rem] object-cover" />
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "HeroSection",
  setup() {
    const colorMode = useColorMode()
    return { colorMode }
  },
  data() {
    return {
      userEmail: null,
      colorClasses: [
        'bg-inherit', 'bg-current', 'bg-transparent', 'bg-black', 'bg-white',
        'bg-slate-50', 'bg-slate-100', 'bg-slate-200', 'bg-slate-300', 'bg-slate-400',
        'bg-slate-500', 'bg-slate-600', 'bg-slate-700', 'bg-slate-800', 'bg-slate-900', 'bg-slate-950',
        'bg-gray-50', 'bg-gray-100', 'bg-gray-200', 'bg-gray-300', 'bg-gray-400',
        'bg-gray-500', 'bg-gray-600', 'bg-gray-700', 'bg-gray-800', 'bg-gray-900', 'bg-gray-950',
        'bg-zinc-50', 'bg-zinc-100', 'bg-zinc-200', 'bg-zinc-300', 'bg-zinc-400',
        'bg-zinc-500', 'bg-zinc-600', 'bg-zinc-700', 'bg-zinc-800', 'bg-zinc-900', 'bg-zinc-950',
        'bg-neutral-50', 'bg-neutral-100', 'bg-neutral-200', 'bg-neutral-300', 'bg-neutral-400',
        'bg-neutral-500', 'bg-neutral-600', 'bg-neutral-700', 'bg-neutral-800', 'bg-neutral-900', 'bg-neutral-950',
        'bg-stone-50', 'bg-stone-100', 'bg-stone-200', 'bg-stone-300', 'bg-stone-400',
        'bg-stone-500', 'bg-stone-600', 'bg-stone-700', 'bg-stone-800', 'bg-stone-900', 'bg-stone-950',
        'bg-red-50', 'bg-red-100', 'bg-red-200', 'bg-red-300', 'bg-red-400',
        'bg-red-500', 'bg-red-600', 'bg-red-700', 'bg-red-800', 'bg-red-900', 'bg-red-950',
        'bg-orange-50', 'bg-orange-100', 'bg-orange-200', 'bg-orange-300', 'bg-orange-400',
        'bg-orange-500', 'bg-orange-600', 'bg-orange-700', 'bg-orange-800', 'bg-orange-900', 'bg-orange-950',
        'bg-amber-50', 'bg-amber-100', 'bg-amber-200', 'bg-amber-300', 'bg-amber-400',
        'bg-amber-500', 'bg-amber-600', 'bg-amber-700', 'bg-amber-800', 'bg-amber-900', 'bg-amber-950',
        'bg-yellow-50', 'bg-yellow-100', 'bg-yellow-200', 'bg-yellow-300', 'bg-yellow-400',
        'bg-yellow-500', 'bg-yellow-600', 'bg-yellow-700', 'bg-yellow-800', 'bg-yellow-900', 'bg-yellow-950',
        'bg-lime-50', 'bg-lime-100', 'bg-lime-200', 'bg-lime-300', 'bg-lime-400',
        'bg-lime-500', 'bg-lime-600', 'bg-lime-700', 'bg-lime-800', 'bg-lime-900', 'bg-lime-950',
        'bg-green-50', 'bg-green-100', 'bg-green-200', 'bg-green-300', 'bg-green-400',
        'bg-green-500', 'bg-green-600', 'bg-green-700', 'bg-green-800', 'bg-green-900', 'bg-green-950',
        'bg-emerald-50', 'bg-emerald-100', 'bg-emerald-200', 'bg-emerald-300', 'bg-emerald-400',
        'bg-emerald-500', 'bg-emerald-600', 'bg-emerald-700', 'bg-emerald-800', 'bg-emerald-900', 'bg-emerald-950',
        'bg-teal-50', 'bg-teal-100', 'bg-teal-200', 'bg-teal-300', 'bg-teal-400',
        'bg-teal-500', 'bg-teal-600', 'bg-teal-700', 'bg-teal-800', 'bg-teal-900', 'bg-teal-950',
        'bg-cyan-50', 'bg-cyan-100', 'bg-cyan-200', 'bg-cyan-300', 'bg-cyan-400',
        'bg-cyan-500', 'bg-cyan-600', 'bg-cyan-700', 'bg-cyan-800', 'bg-cyan-900', 'bg-cyan-950',
        'bg-sky-50', 'bg-sky-100', 'bg-sky-200', 'bg-sky-300', 'bg-sky-400',
        'bg-sky-500', 'bg-sky-600', 'bg-sky-700', 'bg-sky-800', 'bg-sky-900', 'bg-sky-950',
        'bg-blue-50', 'bg-blue-100', 'bg-blue-200', 'bg-blue-300', 'bg-blue-400',
        'bg-blue-500', 'bg-blue-600', 'bg-blue-700', 'bg-blue-800', 'bg-blue-900', 'bg-blue-950',
        'bg-indigo-50', 'bg-indigo-100', 'bg-indigo-200', 'bg-indigo-300', 'bg-indigo-400',
        'bg-indigo-500', 'bg-indigo-600', 'bg-indigo-700', 'bg-indigo-800', 'bg-indigo-900', 'bg-indigo-950',
        'bg-violet-50', 'bg-violet-100', 'bg-violet-200', 'bg-violet-300', 'bg-violet-400',
        'bg-violet-500', 'bg-violet-600', 'bg-violet-700', 'bg-violet-800', 'bg-violet-900', 'bg-violet-950',
        'bg-purple-50', 'bg-purple-100', 'bg-purple-200', 'bg-purple-300', 'bg-purple-400',
        'bg-purple-500', 'bg-purple-600', 'bg-purple-700', 'bg-purple-800', 'bg-purple-900', 'bg-purple-950',
        'bg-fuchsia-50', 'bg-fuchsia-100', 'bg-fuchsia-200', 'bg-fuchsia-300', 'bg-fuchsia-400',
        'bg-fuchsia-500', 'bg-fuchsia-600', 'bg-fuchsia-700', 'bg-fuchsia-800', 'bg-fuchsia-900', 'bg-fuchsia-950',
        'bg-pink-50', 'bg-pink-100', 'bg-pink-200', 'bg-pink-300', 'bg-pink-400',
        'bg-pink-500', 'bg-pink-600', 'bg-pink-700', 'bg-pink-800', 'bg-pink-900', 'bg-pink-950',
        'bg-rose-50', 'bg-rose-100', 'bg-rose-200', 'bg-rose-300', 'bg-rose-400',
        'bg-rose-500', 'bg-rose-600', 'bg-rose-700', 'bg-rose-800', 'bg-rose-900', 'bg-rose-950'
      ],
      textClasses: [
        'text-inherit', 'text-current', 'text-transparent', 'text-black', 'text-white',
        'text-slate-50', 'text-slate-100', 'text-slate-200', 'text-slate-300', 'text-slate-400',
        'text-slate-500', 'text-slate-600', 'text-slate-700', 'text-slate-800', 'text-slate-900', 'text-slate-950',
        'text-gray-50', 'text-gray-100', 'text-gray-200', 'text-gray-300', 'text-gray-400',
        'text-gray-500', 'text-gray-600', 'text-gray-700', 'text-gray-800', 'text-gray-900', 'text-gray-950',
        'text-zinc-50', 'text-zinc-100', 'text-zinc-200', 'text-zinc-300', 'text-zinc-400',
        'text-zinc-500', 'text-zinc-600', 'text-zinc-700', 'text-zinc-800', 'text-zinc-900', 'text-zinc-950',
        'text-neutral-50', 'text-neutral-100', 'text-neutral-200', 'text-neutral-300', 'text-neutral-400',
        'text-neutral-500', 'text-neutral-600', 'text-neutral-700', 'text-neutral-800', 'text-neutral-900', 'text-neutral-950',
        'text-stone-50', 'text-stone-100', 'text-stone-200', 'text-stone-300', 'text-stone-400',
        'text-stone-500', 'text-stone-600', 'text-stone-700', 'text-stone-800', 'text-stone-900', 'text-stone-950',
        'text-red-50', 'text-red-100', 'text-red-200', 'text-red-300', 'text-red-400',
        'text-red-500', 'text-red-600', 'text-red-700', 'text-red-800', 'text-red-900', 'text-red-950',
        'text-orange-50', 'text-orange-100', 'text-orange-200', 'text-orange-300', 'text-orange-400',
        'text-orange-500', 'text-orange-600', 'text-orange-700', 'text-orange-800', 'text-orange-900', 'text-orange-950',
        'text-amber-50', 'text-amber-100', 'text-amber-200', 'text-amber-300', 'text-amber-400',
        'text-amber-500', 'text-amber-600', 'text-amber-700', 'text-amber-800', 'text-amber-900', 'text-amber-950',
        'text-yellow-50', 'text-yellow-100', 'text-yellow-200', 'text-yellow-300', 'text-yellow-400',
        'text-yellow-500', 'text-yellow-600', 'text-yellow-700', 'text-yellow-800', 'text-yellow-900', 'text-yellow-950',
        'text-lime-50', 'text-lime-100', 'text-lime-200', 'text-lime-300', 'text-lime-400',
        'text-lime-500', 'text-lime-600', 'text-lime-700', 'text-lime-800', 'text-lime-900', 'text-lime-950',
        'text-green-50', 'text-green-100', 'text-green-200', 'text-green-300', 'text-green-400',
        'text-green-500', 'text-green-600', 'text-green-700', 'text-green-800', 'text-green-900', 'text-green-950',
        'text-emerald-50', 'text-emerald-100', 'text-emerald-200', 'text-emerald-300', 'text-emerald-400',
        'text-emerald-500', 'text-emerald-600', 'text-emerald-700', 'text-emerald-800', 'text-emerald-900', 'text-emerald-950',
        'text-teal-50', 'text-teal-100', 'text-teal-200', 'text-teal-300', 'text-teal-400',
        'text-teal-500', 'text-teal-600', 'text-teal-700', 'text-teal-800', 'text-teal-900', 'text-teal-950',
        'text-cyan-50', 'text-cyan-100', 'text-cyan-200', 'text-cyan-300', 'text-cyan-400',
        'text-cyan-500', 'text-cyan-600', 'text-cyan-700', 'text-cyan-800', 'text-cyan-900', 'text-cyan-950',
        'text-sky-50', 'text-sky-100', 'text-sky-200', 'text-sky-300', 'text-sky-400',
        'text-sky-500', 'text-sky-600', 'text-sky-700', 'text-sky-800', 'text-sky-900', 'text-sky-950',
        'text-blue-50', 'text-blue-100', 'text-blue-200', 'text-blue-300', 'text-blue-400',
        'text-blue-500', 'text-blue-600', 'text-blue-700', 'text-blue-800', 'text-blue-900', 'text-blue-950',
        'text-indigo-50', 'text-indigo-100', 'text-indigo-200', 'text-indigo-300', 'text-indigo-400',
        'text-indigo-500', 'text-indigo-600', 'text-indigo-700', 'text-indigo-800', 'text-indigo-900', 'text-indigo-950',
        'text-violet-50', 'text-violet-100', 'text-violet-200', 'text-violet-300', 'text-violet-400',
        'text-violet-500', 'text-violet-600', 'text-violet-700', 'text-violet-800', 'text-violet-900', 'text-violet-950',
        'text-purple-50', 'text-purple-100', 'text-purple-200', 'text-purple-300', 'text-purple-400',
        'text-purple-500', 'text-purple-600', 'text-purple-700', 'text-purple-800', 'text-purple-900', 'text-purple-950',
        'text-fuchsia-50', 'text-fuchsia-100', 'text-fuchsia-200', 'text-fuchsia-300', 'text-fuchsia-400',
        'text-fuchsia-500', 'text-fuchsia-600', 'text-fuchsia-700', 'text-fuchsia-800', 'text-fuchsia-900', 'text-fuchsia-950',
        'text-pink-50', 'text-pink-100', 'text-pink-200', 'text-pink-300', 'text-pink-400',
        'text-pink-500', 'text-pink-600', 'text-pink-700', 'text-pink-800', 'text-pink-900', 'text-pink-950',
        'text-rose-50', 'text-rose-100', 'text-rose-200', 'text-rose-300', 'text-rose-400',
        'text-rose-500', 'text-rose-600', 'text-rose-700', 'text-rose-800', 'text-rose-900', 'text-rose-950'
      ],
      gradientFromClasses: [
        'from-inherit', 'from-current', 'from-transparent', 'from-black', 'from-white',
        'from-slate-50', 'from-slate-100', 'from-slate-200', 'from-slate-300', 'from-slate-400',
        'from-slate-500', 'from-slate-600', 'from-slate-700', 'from-slate-800', 'from-slate-900', 'from-slate-950',
        'from-gray-50', 'from-gray-100', 'from-gray-200', 'from-gray-300', 'from-gray-400',
        'from-gray-500', 'from-gray-600', 'from-gray-700', 'from-gray-800', 'from-gray-900', 'from-gray-950',
        'from-zinc-50', 'from-zinc-100', 'from-zinc-200', 'from-zinc-300', 'from-zinc-400',
        'from-zinc-500', 'from-zinc-600', 'from-zinc-700', 'from-zinc-800', 'from-zinc-900', 'from-zinc-950',
        'from-neutral-50', 'from-neutral-100', 'from-neutral-200', 'from-neutral-300', 'from-neutral-400',
        'from-neutral-500', 'from-neutral-600', 'from-neutral-700', 'from-neutral-800', 'from-neutral-900', 'from-neutral-950',
        'from-stone-50', 'from-stone-100', 'from-stone-200', 'from-stone-300', 'from-stone-400',
        'from-stone-500', 'from-stone-600', 'from-stone-700', 'from-stone-800', 'from-stone-900', 'from-stone-950',
        'from-red-50', 'from-red-100', 'from-red-200', 'from-red-300', 'from-red-400',
        'from-red-500', 'from-red-600', 'from-red-700', 'from-red-800', 'from-red-900', 'from-red-950',
        'from-orange-50', 'from-orange-100', 'from-orange-200', 'from-orange-300', 'from-orange-400',
        'from-orange-500', 'from-orange-600', 'from-orange-700', 'from-orange-800', 'from-orange-900', 'from-orange-950',
        'from-amber-50', 'from-amber-100', 'from-amber-200', 'from-amber-300', 'from-amber-400',
        'from-amber-500', 'from-amber-600', 'from-amber-700', 'from-amber-800', 'from-amber-900', 'from-amber-950',
        'from-yellow-50', 'from-yellow-100', 'from-yellow-200', 'from-yellow-300', 'from-yellow-400',
        'from-yellow-500', 'from-yellow-600', 'from-yellow-700', 'from-yellow-800', 'from-yellow-900', 'from-yellow-950',
        'from-lime-50', 'from-lime-100', 'from-lime-200', 'from-lime-300', 'from-lime-400',
        'from-lime-500', 'from-lime-600', 'from-lime-700', 'from-lime-800', 'from-lime-900', 'from-lime-950',
        'from-green-50', 'from-green-100', 'from-green-200', 'from-green-300', 'from-green-400',
        'from-green-500', 'from-green-600', 'from-green-700', 'from-green-800', 'from-green-900', 'from-green-950',
        'from-emerald-50', 'from-emerald-100', 'from-emerald-200', 'from-emerald-300', 'from-emerald-400',
        'from-emerald-500', 'from-emerald-600', 'from-emerald-700', 'from-emerald-800', 'from-emerald-900', 'from-emerald-950',
        'from-teal-50', 'from-teal-100', 'from-teal-200', 'from-teal-300', 'from-teal-400',
        'from-teal-500', 'from-teal-600', 'from-teal-700', 'from-teal-800', 'from-teal-900', 'from-teal-950',
        'from-cyan-50', 'from-cyan-100', 'from-cyan-200', 'from-cyan-300', 'from-cyan-400',
        'from-cyan-500', 'from-cyan-600', 'from-cyan-700', 'from-cyan-800', 'from-cyan-900', 'from-cyan-950',
        'from-sky-50', 'from-sky-100', 'from-sky-200', 'from-sky-300', 'from-sky-400',
        'from-sky-500', 'from-sky-600', 'from-sky-700', 'from-sky-800', 'from-sky-900', 'from-sky-950',
        'from-blue-50', 'from-blue-100', 'from-blue-200', 'from-blue-300', 'from-blue-400',
        'from-blue-500', 'from-blue-600', 'from-blue-700', 'from-blue-800', 'from-blue-900', 'from-blue-950',
        'from-indigo-50', 'from-indigo-100', 'from-indigo-200', 'from-indigo-300', 'from-indigo-400',
        'from-indigo-500', 'from-indigo-600', 'from-indigo-700', 'from-indigo-800', 'from-indigo-900', 'from-indigo-950',
        'from-violet-50', 'from-violet-100', 'from-violet-200', 'from-violet-300', 'from-violet-400',
        'from-violet-500', 'from-violet-600', 'from-violet-700', 'from-violet-800', 'from-violet-900', 'from-violet-950',
        'from-purple-50', 'from-purple-100', 'from-purple-200', 'from-purple-300', 'from-purple-400',
        'from-purple-500', 'from-purple-600', 'from-purple-700', 'from-purple-800', 'from-purple-900', 'from-purple-950',
        'from-fuchsia-50', 'from-fuchsia-100', 'from-fuchsia-200', 'from-fuchsia-300', 'from-fuchsia-400',
        'from-fuchsia-500', 'from-fuchsia-600', 'from-fuchsia-700', 'from-fuchsia-800', 'from-fuchsia-900', 'from-fuchsia-950',
        'from-pink-50', 'from-pink-100', 'from-pink-200', 'from-pink-300', 'from-pink-400',
        'from-pink-500', 'from-pink-600', 'from-pink-700', 'from-pink-800', 'from-pink-900', 'from-pink-950',
        'from-rose-50', 'from-rose-100', 'from-rose-200', 'from-rose-300', 'from-rose-400',
        'from-rose-500', 'from-rose-600', 'from-rose-700', 'from-rose-800', 'from-rose-900', 'from-rose-950'
      ],
      gradientToClasses: [
        'to-inherit', 'to-current', 'to-transparent', 'to-black', 'to-white',
        'to-slate-50', 'to-slate-100', 'to-slate-200', 'to-slate-300', 'to-slate-400',
        'to-slate-500', 'to-slate-600', 'to-slate-700', 'to-slate-800', 'to-slate-900', 'to-slate-950',
        'to-gray-50', 'to-gray-100', 'to-gray-200', 'to-gray-300', 'to-gray-400',
        'to-gray-500', 'to-gray-600', 'to-gray-700', 'to-gray-800', 'to-gray-900', 'to-gray-950',
        'to-zinc-50', 'to-zinc-100', 'to-zinc-200', 'to-zinc-300', 'to-zinc-400',
        'to-zinc-500', 'to-zinc-600', 'to-zinc-700', 'to-zinc-800', 'to-zinc-900', 'to-zinc-950',
        'to-neutral-50', 'to-neutral-100', 'to-neutral-200', 'to-neutral-300', 'to-neutral-400',
        'to-neutral-500', 'to-neutral-600', 'to-neutral-700', 'to-neutral-800', 'to-neutral-900', 'to-neutral-950',
        'to-stone-50', 'to-stone-100', 'to-stone-200', 'to-stone-300', 'to-stone-400',
        'to-stone-500', 'to-stone-600', 'to-stone-700', 'to-stone-800', 'to-stone-900', 'to-stone-950',
        'to-red-50', 'to-red-100', 'to-red-200', 'to-red-300', 'to-red-400',
        'to-red-500', 'to-red-600', 'to-red-700', 'to-red-800', 'to-red-900', 'to-red-950',
        'to-orange-50', 'to-orange-100', 'to-orange-200', 'to-orange-300', 'to-orange-400',
        'to-orange-500', 'to-orange-600', 'to-orange-700', 'to-orange-800', 'to-orange-900', 'to-orange-950',
        'to-amber-50', 'to-amber-100', 'to-amber-200', 'to-amber-300', 'to-amber-400',
        'to-amber-500', 'to-amber-600', 'to-amber-700', 'to-amber-800', 'to-amber-900', 'to-amber-950',
        'to-yellow-50', 'to-yellow-100', 'to-yellow-200', 'to-yellow-300', 'to-yellow-400',
        'to-yellow-500', 'to-yellow-600', 'to-yellow-700', 'to-yellow-800', 'to-yellow-900', 'to-yellow-950',
        'to-lime-50', 'to-lime-100', 'to-lime-200', 'to-lime-300', 'to-lime-400',
        'to-lime-500', 'to-lime-600', 'to-lime-700', 'to-lime-800', 'to-lime-900', 'to-lime-950',
        'to-green-50', 'to-green-100', 'to-green-200', 'to-green-300', 'to-green-400',
        'to-green-500', 'to-green-600', 'to-green-700', 'to-green-800', 'to-green-900', 'to-green-950',
        'to-emerald-50', 'to-emerald-100', 'to-emerald-200', 'to-emerald-300', 'to-emerald-400',
        'to-emerald-500', 'to-emerald-600', 'to-emerald-700', 'to-emerald-800', 'to-emerald-900', 'to-emerald-950',
        'to-teal-50', 'to-teal-100', 'to-teal-200', 'to-teal-300', 'to-teal-400',
        'to-teal-500', 'to-teal-600', 'to-teal-700', 'to-teal-800', 'to-teal-900', 'to-teal-950',
        'to-cyan-50', 'to-cyan-100', 'to-cyan-200', 'to-cyan-300', 'to-cyan-400',
        'to-cyan-500', 'to-cyan-600', 'to-cyan-700', 'to-cyan-800', 'to-cyan-900', 'to-cyan-950',
        'to-sky-50', 'to-sky-100', 'to-sky-200', 'to-sky-300', 'to-sky-400',
        'to-sky-500', 'to-sky-600', 'to-sky-700', 'to-sky-800', 'to-sky-900', 'to-sky-950',
        'to-blue-50', 'to-blue-100', 'to-blue-200', 'to-blue-300', 'to-blue-400',
        'to-blue-500', 'to-blue-600', 'to-blue-700', 'to-blue-800', 'to-blue-900', 'to-blue-950',
        'to-indigo-50', 'to-indigo-100', 'to-indigo-200', 'to-indigo-300', 'to-indigo-400',
        'to-indigo-500', 'to-indigo-600', 'to-indigo-700', 'to-indigo-800', 'to-indigo-900', 'to-indigo-950',
        'to-violet-50', 'to-violet-100', 'to-violet-200', 'to-violet-300', 'to-violet-400',
        'to-violet-500', 'to-violet-600', 'to-violet-700', 'to-violet-800', 'to-violet-900', 'to-violet-950',
        'to-purple-50', 'to-purple-100', 'to-purple-200', 'to-purple-300', 'to-purple-400',
        'to-purple-500', 'to-purple-600', 'to-purple-700', 'to-purple-800', 'to-purple-900', 'to-purple-950',
        'to-fuchsia-50', 'to-fuchsia-100', 'to-fuchsia-200', 'to-fuchsia-300', 'to-fuchsia-400',
        'to-fuchsia-500', 'to-fuchsia-600', 'to-fuchsia-700', 'to-fuchsia-800', 'to-fuchsia-900', 'to-fuchsia-950',
        'to-pink-50', 'to-pink-100', 'to-pink-200', 'to-pink-300', 'to-pink-400',
        'to-pink-500', 'to-pink-600', 'to-pink-700', 'to-pink-800', 'to-pink-900', 'to-pink-950',
        'to-rose-50', 'to-rose-100', 'to-rose-200', 'to-rose-300', 'to-rose-400',
        'to-rose-500', 'to-rose-600', 'to-rose-700', 'to-rose-800', 'to-rose-900', 'to-rose-950'
      ],
    };
  },
  props: {
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    color: { type: String, default: "blue-400" },
    imgHero: { type: String, default: "" },
    appName: { type: String, default: "" },
  },
  created() {
    this.fetchUserEmail();
  },
  computed: {
    gradientClass() {
      const baseColor = this.color.replace('bg-', '');

      const match = baseColor.match(/-(\d+)$/);
      if (!match) return '';

      const currentShade = parseInt(match[1], 10);
      const lighterShade = Math.max(currentShade - 100, 50);

      const fromClass = `from-${baseColor}`;
      const toClass = `to-${baseColor.replace(/-\d+$/, `-${lighterShade}`)}`;
      console.log(`bg-gradient-to-b ${fromClass} ${toClass}`);

      return `bg-gradient-to-b ${fromClass} ${toClass}`;
    },
    linkClass() {
      return `text-${this.color}`;
    },
    buttonClass() {
      return `${this.color} hover:${this.color.replace(/-\d+$/, '')}`;
    }

  },
  methods: {
    goLogin() {
      this.$router.push({ path: '/login', query: { color: this.color, appName: this.appName } });
    },
    setUserEmail(email) {
      this.userEmail = email;
    },
    async fetchUserEmail() {
      try {
        const token = localStorage.getItem("token");
        const response = await $fetch("/api/auth/getUser", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          this.userEmail = response.email;
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération de l'utilisateur:",
          error
        );
      }
    },
    async logout() {
      try {
        const token = localStorage.getItem("token");
        const response = await $fetch("/api/auth/logout", {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          localStorage.removeItem("token");
          this.userEmail = null;
          alert(response.message);
        }
      } catch (error) {
        console.error("Erreur lors de la déconnexion:", error);
      }
    },
  },
};
</script>
