<template>
    <div>
        <div class="absolute inset-0 bg-gradient-to-br from-orange-700 via-white to-indigo-700 opacity-60"></div>
        <div
            class="absolute inset-0 text-slate-900/[0.09] [mask-image:linear-gradient(to_bottom_left,transparent,transparent,white)]">
            <svg class="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="grid-bg" width="32" height="32" patternUnits="userSpaceOnUse"
                        patternTransform="rotate(-45)">
                        <path d="M0 32V.5H32" fill="none" stroke="currentColor"></path>
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid-bg)"></rect>
            </svg>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: 'BackgroundPattern'
}
</script>
