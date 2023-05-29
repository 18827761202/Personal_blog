<template>
    <div>
        <div class="slider" :class="{ active: isActive }" :style="{ left: leftPosition }" @mousedown="startDrag"
            @touchstart="startDrag">
            <div class="handle"></div>
        </div>
        <div class="text" v-if="!isVerified">
            将滑块拖动到右侧以解锁
        </div>
        <div class="text" v-else>
            验证成功！
        </div>
    </div>
</template>
  
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const isActive = ref(false);
const isVerified = ref(false);
const startX = ref(0);
const leftPosition = ref('0px');

function startDrag(evt) {
    evt.preventDefault();
    isActive.value = true;
    startX.value = evt.clientX || evt.touches[0].clientX;
    document.addEventListener('mousemove', drag);
    document.addEventListener('touchmove', drag);
    document.addEventListener('mouseup', endDrag);
    document.addEventListener('touchend', endDrag);
}

function drag(evt) {
    evt.preventDefault();
    if (!isActive.value) {
        return;
    }
    const endX = evt.clientX || evt.touches[0].clientX;
    const deltaX = endX - startX.value;
    leftPosition.value = `${Math.max(0, Math.min(200, deltaX))}px`; //设置最小和最大偏移量
}

function endDrag(evt) {
    evt.preventDefault();
    isActive.value = false;
    if (parseFloat(leftPosition.value) >= 200) {
        isVerified.value = true;
        document.removeEventListener('mousemove', drag);
        document.removeEventListener('touchmove', drag);
        document.removeEventListener('mouseup', endDrag);
        document.removeEventListener('touchend', endDrag);
    } else {
        leftPosition.value = '0px';
    }
}

// 在组件挂载时添加移动和结束事件的事件监听器，确保在拖动结束后正确清除事件监听器
onMounted(() => {
    document.addEventListener('mousemove', drag);
    document.addEventListener('touchmove', drag);
    document.addEventListener('mouseup', endDrag);
    document.addEventListener('touchend', endDrag);
});

// 在组件卸载时删除事件监听器
onUnmounted(() => {
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('touchmove', drag);
    document.removeEventListener('mouseup', endDrag);
    document.removeEventListener('touchend', endDrag);
});
</script>