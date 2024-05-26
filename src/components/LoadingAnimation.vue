<template>
    <div class="stack relative flex items-center justify-center h-screen">
        <div class="blobs">
            <span class="blob"></span>
            <span class="blob"></span>
            <span class="blob"></span>
            <span class="blob"></span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'LoadingAnimation'
}
</script>

<style scoped>
.stack {
    display: grid;
    grid-template-areas: 'stack';
}

.blobs {
    display: grid;
    grid-template-areas: 'stack';
    position: relative;
    animation: spin infinite 5s linear;
    grid-area: stack;
}

.blob {
    --border-radius: 115% 140% 145% 110% / 125% 140% 110% 125%;
    --border-width: 2vmin;

    aspect-ratio: 1;
    display: block;
    grid-area: stack;
    background-size: calc(100% + var(--border-width) * 2);
    background-repeat: no-repeat;
    background-position: center;
    border: var(--border-width) solid transparent;
    border-radius: var(--border-radius, 50%);
    mask-image: linear-gradient(transparent, transparent), linear-gradient(black, white);
    mask-clip: padding-box, border-box;
    mask-composite: intersect;
    mix-blend-mode: screen;
    height: 20vmin;
    filter: blur(1vmin);
}

.blob:nth-child(1) {
    background-color: var(--blue);
    background-image: linear-gradient(var(--blue), var(--teal), var(--blue));
    rotate: 30deg;
    scale: 1.03;
}

.blob:nth-child(2) {
    background-color: var(--red);
    background-image: linear-gradient(var(--red), var(--orange), var(--red));
    rotate: 60deg;
    scale: 0.95;
}

.blob:nth-child(3) {
    background-color: var(--olive);
    background-image: linear-gradient(var(--olive), var(--lime), var(--olive));
    rotate: 90deg;
    scale: 0.97;
}

.blob:nth-child(4) {
    background-color: var(--purple);
    background-image: linear-gradient(var(--purple), var(--maroon), var(--purple));
    rotate: 120deg;
    scale: 1.02;
}

.blob-color-1 {
    color: var(--blue);
}

.blob-color-2 {
    color: var(--red);
}

.blob-color-3 {
    color: var(--olive);
}

.blob-color-4 {
    color: var(--purple);
}

@keyframes spin {
    from {
        rotate: 0deg;
    }

    to {
        rotate: 360deg;
    }
}
</style>
