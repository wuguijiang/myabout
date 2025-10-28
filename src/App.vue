<template>
  <div class="container">
    <!-- ... existing code ... -->
    <aside class="sidebar">
      <div class="profile">
        <h1 class="name">张三</h1>
        <p class="title">摄影师</p>
        <p class="tagline">用镜头捕捉生活的美好瞬间</p>
      </div>
      
      <nav class="nav">
        <a 
          v-for="section in sections" 
          :key="section.id"
          href="#"
          class="nav-link"
          :class="{ active: activeSection === section.id }"
          @click.prevent="switchSection(section.id)"
        >
          {{ section.name }}
        </a>
      </nav>
      
      <div class="social-links">
        <a href="https://instagram.com" target="_blank" aria-label="Instagram">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
        </a>
        <a href="https://weibo.com" target="_blank" aria-label="Weibo">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
            <line x1="9" y1="9" x2="9.01" y2="9"></line>
            <line x1="15" y1="9" x2="15.01" y2="9"></line>
          </svg>
        </a>
        <a href="mailto:zhangsan@example.com" aria-label="Email">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
        </a>
      </div>
    </aside>

    <main class="main-content">
      <!-- ... existing code ... -->
      
      <section 
        v-show="activeSection === 'about'" 
        class="section"
        :class="{ active: activeSection === 'about' }"
      >
        <h2 class="section-title">关于我</h2>
        <div class="content">
          <p class="intro">
            我是一名热爱用镜头记录生活的摄影师,专注于人像、风光和纪实摄影。
            我相信每一个瞬间都值得被珍藏,每一张照片背后都有一个动人的故事。
          </p>
          
          <p class="description">
            从事摄影工作多年,我的作品涵盖婚礼摄影、商业拍摄、旅行纪实等多个领域。
            我擅长捕捉自然光线下的真实情感,用镜头讲述属于每个人的独特故事。
          </p>
          
          <p class="description">
            我的摄影理念是"真实而不做作,自然而富有情感"。我喜欢在拍摄中与被摄者建立信任,
            让他们在镜头前展现最真实、最自然的一面。
          </p>
          
          <p class="description">
            在业余时间,我喜欢旅行、阅读和探索新的拍摄地点。每一次旅行都是一次视觉的盛宴,
            也是我创作灵感的重要来源。
          </p>
        </div>
      </section>

      <section 
        v-show="activeSection === 'experience'" 
        class="section"
        :class="{ active: activeSection === 'experience' }"
      >
        <h2 class="section-title">工作经历</h2>
        <div class="content">
          <div class="timeline">
            <div 
              v-for="(exp, index) in experiences" 
              :key="index"
              class="timeline-item"
            >
              <div class="timeline-date">{{ exp.date }}</div>
              <div class="timeline-content">
                <h3 class="timeline-title">{{ exp.title }}</h3>
                <p class="timeline-description">{{ exp.description }}</p>
                <div class="tags">
                  <span 
                    v-for="tag in exp.tags" 
                    :key="tag"
                    class="tag"
                  >
                    {{ tag }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section 
        v-show="activeSection === 'portfolio'" 
        class="section"
        :class="{ active: activeSection === 'portfolio' }"
      >
        <h2 class="section-title">作品集</h2>
        <div class="content">
          <div class="portfolio-grid">
            <div 
              v-for="(work, index) in portfolioWorks" 
              :key="index"
              class="portfolio-item"
              @click="openLightbox(index)"
            >
              <div class="portfolio-image">
                <img :src="work.image" :alt="work.title">
                <div class="portfolio-overlay">
                  <h3 class="portfolio-title">{{ work.title }}</h3>
                  <p class="portfolio-category">{{ work.category }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section 
        v-show="activeSection === 'moments'" 
        class="section"
        :class="{ active: activeSection === 'moments' }"
      >
        <h2 class="section-title">互动空间</h2>
        <div class="content">
          <div class="upload-section">
            <textarea 
              v-model="newMoment.text" 
              placeholder="分享你的摄影故事..."
              class="moment-textarea"
              rows="3"
            ></textarea>
            
            <div class="upload-controls">
              <div class="image-preview-container">
                <div 
                  v-for="(preview, index) in imagePreviews" 
                  :key="index"
                  class="image-preview"
                >
                  <img :src="preview" alt="预览图">
                  <button 
                    @click="removeImage(index)"
                    class="remove-image-btn"
                    type="button"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
              </div>
              
              <div class="upload-actions">
                <label class="upload-btn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <polyline points="21 15 16 10 5 21"></polyline>
                  </svg>
                  <span>选择图片</span>
                  <input 
                    type="file" 
                    @change="handleImageUpload"
                    accept="image/*"
                    multiple
                    style="display: none;"
                  >
                </label>
                
                <button 
                  @click="publishMoment"
                  class="publish-btn"
                  :disabled="!canPublish || isUploading"
                >
                  {{ isUploading ? '上传中...' : '发布' }}
                </button>
              </div>
            </div>
          </div>

          <div class="moments-list">
            <div 
              v-for="(moment, index) in moments" 
              :key="index"
              class="moment-card"
            >
              <div class="moment-header">
                <div class="moment-avatar">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <div class="moment-info">
                  <h4 class="moment-author">张三</h4>
                  <p class="moment-time">{{ moment.time }}</p>
                </div>
              </div>
              
              <p class="moment-text">{{ moment.text }}</p>
              
              <div 
                v-if="moment.images && moment.images.length > 0"
                class="moment-images"
                :class="'images-count-' + moment.images.length"
              >
                <div 
                  v-for="(image, imgIndex) in moment.images" 
                  :key="imgIndex"
                  class="moment-image"
                >
                  <img :src="image" :alt="'图片 ' + (imgIndex + 1)">
                </div>
              </div>
              
              <div class="moment-actions">
                <button class="action-btn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                  <span>喜欢</span>
                </button>
                <button class="action-btn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                  <span>评论</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeSection = ref('about')

const sections = [
  { id: 'about', name: '关于我' },
  { id: 'experience', name: '工作经历' },
  { id: 'portfolio', name: '作品集' },
  { id: 'moments', name: '互动空间' }
]

const experiences = [
  {
    date: '2022 — 至今',
    title: '自由摄影师',
    description: '专注于婚礼摄影、商业拍摄和人像创作。为多家知名品牌提供商业摄影服务,作品被多家杂志和媒体采用。建立个人摄影工作室,为客户提供专业的摄影服务。',
    tags: ['婚礼摄影', '商业摄影', '人像摄影', '后期制作']
  },
  {
    date: '2020 — 2022',
    title: '摄影工作室 · 首席摄影师',
    description: '负责工作室的主要拍摄项目,包括婚礼、活动和商业拍摄。培训新摄影师,制定拍摄流程和质量标准。与客户沟通需求,提供创意方案和专业建议。',
    tags: ['团队管理', '创意策划', '客户服务', '摄影指导']
  },
  {
    date: '2018 — 2020',
    title: '摄影助理 · 影像公司',
    description: '协助资深摄影师完成各类拍摄项目,学习专业摄影技巧和后期处理。负责器材管理、现场布光和拍摄辅助工作。快速成长为独立摄影师。',
    tags: ['摄影基础', '灯光布置', 'Lightroom', 'Photoshop']
  }
]

const portfolioWorks = [
  {
    title: '城市印象',
    category: '风光摄影',
    image: '/placeholder.svg?height=400&width=600'
  },
  {
    title: '自然之美',
    category: '风光摄影',
    image: '/placeholder.svg?height=400&width=600'
  },
  {
    title: '人像故事',
    category: '人像摄影',
    image: '/placeholder.svg?height=400&width=600'
  },
  {
    title: '婚礼瞬间',
    category: '婚礼摄影',
    image: '/placeholder.svg?height=400&width=600'
  },
  {
    title: '街头纪实',
    category: '纪实摄影',
    image: '/placeholder.svg?height=400&width=600'
  },
  {
    title: '商业作品',
    category: '商业摄影',
    image: '/placeholder.svg?height=400&width=600'
  }
]

const newMoment = ref({
  text: '',
  images: []
})

const imagePreviews = ref([])
const isUploading = ref(false)

const moments = ref([
  {
    text: '今天在公园拍到了最美的日落,金色的光线洒在湖面上,美得让人窒息。摄影就是要学会等待最完美的那一刻。',
    images: [
      '/placeholder.svg?height=300&width=300',
      '/placeholder.svg?height=300&width=300'
    ],
    time: '2小时前',
    likes: 24,
    comments: 5
  },
  {
    text: '分享一组最近拍摄的人像作品,自然光下的情绪表达。感谢模特的完美配合!',
    images: [
      '/placeholder.svg?height=300&width=300',
      '/placeholder.svg?height=300&width=300',
      '/placeholder.svg?height=300&width=300'
    ],
    time: '昨天 18:30',
    likes: 56,
    comments: 12
  },
  {
    text: '雨后的城市别有一番风味,倒影、光影、色彩...每一个元素都在诉说着故事。',
    images: [
      '/placeholder.svg?height=300&width=300'
    ],
    time: '3天前',
    likes: 38,
    comments: 8
  }
])

const canPublish = computed(() => {
  return newMoment.value.text.trim() !== '' || imagePreviews.value.length > 0
})

const switchSection = (sectionId) => {
  activeSection.value = sectionId
}

const openLightbox = (index) => {
  console.log('打开作品:', index)
}

const handleImageUpload = (event) => {
  const files = event.target.files
  if (!files || files.length === 0) return
  
  const remainingSlots = 9 - imagePreviews.value.length
  const filesToProcess = Array.from(files).slice(0, remainingSlots)
  
  filesToProcess.forEach(file => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        imagePreviews.value.push(e.target.result)
        newMoment.value.images.push(file)
      }
      reader.readAsDataURL(file)
    }
  })
  
  event.target.value = ''
}

const removeImage = (index) => {
  imagePreviews.value.splice(index, 1)
  newMoment.value.images.splice(index, 1)
}

// <CHANGE> 优化上传逻辑，添加更好的错误处理
const publishMoment = async () => {
  if (!canPublish.value || isUploading.value) return
  
  isUploading.value = true
  
  try {
    const uploadedImageUrls = []
    
    // 上传所有图片
    for (const file of newMoment.value.images) {
      const timestamp = Date.now()
      const randomStr = Math.random().toString(36).substring(7)
      const fileExtension = file.name.split('.').pop() || 'jpg'
      const filename = `photo-${timestamp}-${randomStr}.${fileExtension}`
      
      // 调用后端 API 上传图片到 Vercel Blob
      const uploadResponse = await fetch(`/api/upload?filename=${filename}`, {
        method: 'POST',
        body: file,
      })
      
      if (!uploadResponse.ok) {
        const errorText = await uploadResponse.text()
        throw new Error(`上传失败: ${errorText}`)
      }
      
      const result = await uploadResponse.json()
      uploadedImageUrls.push(result.url)
    }
    
    // 创建新动态
    const moment = {
      text: newMoment.value.text,
      images: uploadedImageUrls,
      time: '刚刚',
      likes: 0,
      comments: 0
    }
    
    moments.value.unshift(moment)
    
    // 清空输入
    newMoment.value.text = ''
    newMoment.value.images = []
    imagePreviews.value = []
    
  } catch (error) {
    console.error('上传失败:', error)
    alert(`上传失败: ${error.message}`)
  } finally {
    isUploading.value = false
  }
}
</script>

<style scoped>
/* ... existing code ... */

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --color-bg: #0f172a;
  --color-bg-secondary: #1e293b;
  --color-text: #e2e8f0;
  --color-text-secondary: #94a3b8;
  --color-accent: #3b82f6;
  --color-accent-hover: #2563eb;
  --color-border: #334155;
  --transition: all 0.3s ease;
}

.container {
  display: flex;
  min-height: 100vh;
  background-color: var(--color-bg);
}

.sidebar {
  width: 320px;
  background-color: var(--color-bg-secondary);
  padding: 3rem 2rem;
  position: fixed;
  height: 100vh;
  overflow-y: auto;
  border-right: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.profile {
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--color-border);
}

.name {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--color-text);
}

.title {
  font-size: 1.125rem;
  color: var(--color-text-secondary);
  margin-bottom: 0.75rem;
}

.tagline {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  line-height: 1.5;
}

.nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.nav-link {
  color: var(--color-text-secondary);
  text-decoration: none;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  transition: var(--transition);
  font-size: 0.9375rem;
  position: relative;
  display: block;
  cursor: pointer;
}

.nav-link::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 0;
  background-color: var(--color-accent);
  transition: var(--transition);
  border-radius: 0 2px 2px 0;
}

.nav-link:hover {
  color: var(--color-text);
  background-color: rgba(59, 130, 246, 0.1);
}

.nav-link.active {
  color: var(--color-accent);
  background-color: rgba(59, 130, 246, 0.1);
}

.nav-link.active::before {
  height: 24px;
}

.social-links {
  display: flex;
  gap: 1rem;
  margin-top: auto;
}

.social-links a {
  color: var(--color-text-secondary);
  transition: var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 0.5rem;
}

.social-links a:hover {
  color: var(--color-accent);
  background-color: rgba(59, 130, 246, 0.1);
}

.main-content {
  margin-left: 320px;
  flex: 1;
  padding: 3rem;
  max-width: 1200px;
}

.section {
  animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: var(--color-text);
}

.content {
  font-size: 1.0625rem;
  line-height: 1.8;
}

.intro {
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
  color: var(--color-text);
  line-height: 1.7;
}

.description {
  color: var(--color-text-secondary);
  margin-bottom: 1.5rem;
}

.timeline {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.timeline-item {
  display: grid;
  grid-template-columns: 150px 1fr;
  gap: 2rem;
  position: relative;
}

.timeline-date {
  color: var(--color-text-secondary);
  font-size: 0.875rem;
  font-weight: 500;
  padding-top: 0.25rem;
}

.timeline-content {
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--color-border);
}

.timeline-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: var(--color-text);
}

.timeline-description {
  color: var(--color-text-secondary);
  margin-bottom: 1rem;
  line-height: 1.7;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  background-color: rgba(59, 130, 246, 0.1);
  color: var(--color-accent);
  padding: 0.375rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.8125rem;
  font-weight: 500;
  border: 1px solid rgba(59, 130, 246, 0.2);
}

.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
}

.portfolio-item {
  position: relative;
  overflow: hidden;
  border-radius: 0.75rem;
  cursor: pointer;
  aspect-ratio: 3/2;
}

.portfolio-image {
  width: 100%;
  height: 100%;
  position: relative;
}

.portfolio-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.portfolio-item:hover .portfolio-image img {
  transform: scale(1.1);
}

.portfolio-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
  padding: 2rem 1.5rem 1.5rem;
  transform: translateY(100%);
  transition: transform 0.3s ease;
}

.portfolio-item:hover .portfolio-overlay {
  transform: translateY(0);
}

.portfolio-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: white;
  margin-bottom: 0.25rem;
}

.portfolio-category {
  font-size: 0.875rem;
  color: rgba(255,255,255,0.8);
}

.upload-section {
  background-color: var(--color-bg-secondary);
  border-radius: 0.75rem;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border: 1px solid var(--color-border);
}

.moment-textarea {
  width: 100%;
  background-color: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  padding: 1rem;
  color: var(--color-text);
  font-size: 0.9375rem;
  line-height: 1.6;
  resize: vertical;
  font-family: inherit;
  margin-bottom: 1rem;
}

.moment-textarea:focus {
  outline: none;
  border-color: var(--color-accent);
}

.moment-textarea::placeholder {
  color: var(--color-text-secondary);
}

.upload-controls {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.image-preview-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 0.75rem;
}

.image-preview {
  position: relative;
  aspect-ratio: 1;
  border-radius: 0.5rem;
  overflow: hidden;
  background-color: var(--color-bg);
}

.image-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.remove-image-btn {
  position: absolute;
  top: 0.25rem;
  right: 0.25rem;
  background-color: rgba(0,0,0,0.6);
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  transition: var(--transition);
}

.remove-image-btn:hover {
  background-color: rgba(239, 68, 68, 0.8);
}

.upload-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.upload-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1.25rem;
  background-color: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: var(--transition);
  font-size: 0.9375rem;
}

.upload-btn:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
}

.publish-btn {
  padding: 0.625rem 2rem;
  background-color: var(--color-accent);
  border: none;
  border-radius: 0.5rem;
  color: white;
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
  font-size: 0.9375rem;
}

.publish-btn:hover:not(:disabled) {
  background-color: var(--color-accent-hover);
}

.publish-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.moments-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.moment-card {
  background-color: var(--color-bg-secondary);
  border-radius: 0.75rem;
  padding: 1.5rem;
  border: 1px solid var(--color-border);
}

.moment-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.moment-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: var(--color-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-secondary);
}

.moment-info {
  flex: 1;
}

.moment-author {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 0.25rem;
}

.moment-time {
  font-size: 0.8125rem;
  color: var(--color-text-secondary);
}

.moment-text {
  color: var(--color-text);
  line-height: 1.6;
  margin-bottom: 1rem;
  font-size: 0.9375rem;
}

.moment-images {
  display: grid;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.moment-images.images-count-1 {
  grid-template-columns: 1fr;
  max-width: 400px;
}

.moment-images.images-count-2,
.moment-images.images-count-4 {
  grid-template-columns: repeat(2, 1fr);
}

.moment-images.images-count-3,
.moment-images.images-count-5,
.moment-images.images-count-6,
.moment-images.images-count-7,
.moment-images.images-count-8,
.moment-images.images-count-9 {
  grid-template-columns: repeat(3, 1fr);
}

.moment-image {
  aspect-ratio: 1;
  border-radius: 0.5rem;
  overflow: hidden;
  background-color: var(--color-bg);
}

.moment-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
  transition: var(--transition);
}

.moment-image img:hover {
  transform: scale(1.05);
}

.moment-actions {
  display: flex;
  gap: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid var(--color-border);
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: var(--transition);
  font-size: 0.875rem;
  padding: 0.5rem;
  border-radius: 0.375rem;
}

.action-btn:hover {
  color: var(--color-accent);
  background-color: rgba(59, 130, 246, 0.1);
}

@media (max-width: 1024px) {
  .sidebar {
    width: 280px;
  }
  
  .main-content {
    margin-left: 280px;
    padding: 2rem;
  }
  
  .timeline-item {
    grid-template-columns: 120px 1fr;
    gap: 1.5rem;
  }
  
  .portfolio-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }
  
  .sidebar {
    width: 100%;
    position: relative;
    height: auto;
    padding: 2rem 1.5rem;
  }
  
  .main-content {
    margin-left: 0;
    padding: 2rem 1.5rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .timeline-item {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
  
  .timeline-date {
    padding-top: 0;
  }
  
  .portfolio-grid {
    grid-template-columns: 1fr;
  }
  
  .image-preview-container {
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  }
  
  .upload-actions {
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .upload-btn,
  .publish-btn {
    width: 100%;
    justify-content: center;
  }
}

.sidebar::-webkit-scrollbar {
  width: 6px;
}

.sidebar::-webkit-scrollbar-track {
  background: var(--color-bg);
}

.sidebar::-webkit-scrollbar-thumb {
  background: var(--color-border);
  border-radius: 3px;
}

.sidebar::-webkit-scrollbar-thumb:hover {
  background: var(--color-accent);
}
</style>