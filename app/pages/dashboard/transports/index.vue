<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">إدارة وسائل المواصلات</h1>
            <p class="mt-1 text-sm text-gray-500">إدارة وإضافة وتعديل وسائل المواصلات</p>
          </div>
          <button
            @click="showAddModal = true"
            class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            إضافة وسيلة مواصلات
          </button>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Filters -->
      <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">البحث</label>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="ابحث عن وسيلة مواصلات..."
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">النوع</label>
            <select
              v-model="selectedType"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">جميع الأنواع</option>
              <option value="bus">حافلة</option>
              <option value="taxi">تاكسي</option>
              <option value="train">قطار</option>
              <option value="plane">طائرة</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">الحالة</label>
            <select
              v-model="selectedStatus"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">جميع الحالات</option>
              <option value="active">نشط</option>
              <option value="inactive">غير نشط</option>
            </select>
          </div>
          <div class="flex items-end">
            <button
              @click="resetFilters"
              class="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md transition-colors"
            >
              إعادة تعيين
            </button>
          </div>
        </div>
      </div>

      <!-- Transports Table -->
      <div class="bg-white rounded-lg shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الاسم
                </th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  النوع
                </th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  السعر
                </th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الحالة
                </th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  تاريخ الإنشاء
                </th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الإجراءات
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="transport in filteredTransports" :key="transport._id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                      <img
                        :src="transport.image || '/placeholder-transport.jpg'"
                        :alt="transport.name"
                        class="h-10 w-10 rounded-full object-cover"
                      >
                    </div>
                    <div class="mr-4">
                      <div class="text-sm font-medium text-gray-900">{{ transport.name }}</div>
                      <div class="text-sm text-gray-500">{{ transport.description }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                        :class="getTypeClass(transport.type)">
                    {{ getTypeLabel(transport.type) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ transport.price }} ج.م
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                        :class="transport.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
                    {{ transport.status === 'active' ? 'نشط' : 'غير نشط' }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ formatDate(transport.createdAt) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div class="flex items-center gap-2">
                    <button
                      @click="editTransport(transport)"
                      class="text-blue-600 hover:text-blue-900 p-1 rounded"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                      </svg>
                    </button>
                    <button
                      @click="deleteTransport(transport._id)"
                      class="text-red-600 hover:text-red-900 p-1 rounded"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Empty State -->
        <div v-if="filteredTransports.length === 0" class="text-center py-12">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 4v10m6-10v10"></path>
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900">لا توجد وسائل مواصلات</h3>
          <p class="mt-1 text-sm text-gray-500">ابدأ بإضافة وسيلة مواصلات جديدة</p>
        </div>
      </div>
    </div>

    <!-- Add/Edit Modal -->
    <div v-if="showAddModal || showEditModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-medium text-gray-900">
              {{ showEditModal ? 'تعديل وسيلة المواصلات' : 'إضافة وسيلة مواصلات جديدة' }}
            </h3>
            <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <form @submit.prevent="submitForm" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">اسم وسيلة المواصلات</label>
                <input
                  v-model="form.name"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="أدخل اسم وسيلة المواصلات"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">النوع</label>
                <select
                  v-model="form.type"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">اختر النوع</option>
                  <option value="bus">حافلة</option>
                  <option value="taxi">تاكسي</option>
                  <option value="train">قطار</option>
                  <option value="plane">طائرة</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">الوصف</label>
              <textarea
                v-model="form.description"
                rows="3"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="أدخل وصف وسيلة المواصلات"
              ></textarea>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">السعر (ج.م)</label>
                <input
                  v-model="form.price"
                  type="number"
                  min="0"
                  step="0.01"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0.00"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">الحالة</label>
                <select
                  v-model="form.status"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="active">نشط</option>
                  <option value="inactive">غير نشط</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">رابط الصورة</label>
              <input
                v-model="form.image"
                type="url"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://example.com/image.jpg"
              >
            </div>

            <div class="flex justify-end gap-3 pt-4">
              <button
                type="button"
                @click="closeModal"
                class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
              >
                إلغاء
              </button>
              <button
                type="submit"
                :disabled="loading"
                class="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors disabled:opacity-50"
              >
                {{ loading ? 'جاري الحفظ...' : (showEditModal ? 'تحديث' : 'إضافة') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})

// Reactive data
const transports = ref([])
const loading = ref(false)
const showAddModal = ref(false)
const showEditModal = ref(false)
const searchQuery = ref('')
const selectedType = ref('')
const selectedStatus = ref('')

// Form data
const form = ref({
  name: '',
  type: '',
  description: '',
  price: 0,
  status: 'active',
  image: ''
})

const editingId = ref(null)

// Computed
const filteredTransports = computed(() => {
  return transports.value.filter(transport => {
    const matchesSearch = transport.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         transport.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesType = !selectedType.value || transport.type === selectedType.value
    const matchesStatus = !selectedStatus.value || transport.status === selectedStatus.value
    
    return matchesSearch && matchesType && matchesStatus
  })
})

// Methods
const fetchTransports = async () => {
  try {
    loading.value = true
    // Mock data for now - replace with actual API call
    transports.value = [
      {
        _id: '1',
        name: 'حافلة القاهرة - الإسكندرية',
        type: 'bus',
        description: 'حافلة مكيفة مريحة',
        price: 150,
        status: 'active',
        image: 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg',
        createdAt: new Date()
      },
      {
        _id: '2',
        name: 'تاكسي المطار',
        type: 'taxi',
        description: 'خدمة تاكسي سريعة للمطار',
        price: 200,
        status: 'active',
        image: 'https://images.pexels.com/photos/1118448/pexels-photo-1118448.jpeg',
        createdAt: new Date()
      }
    ]
  } catch (error) {
    console.error('Error fetching transports:', error)
  } finally {
    loading.value = false
  }
}

const submitForm = async () => {
  try {
    loading.value = true
    
    if (showEditModal.value) {
      // Update existing transport
      const index = transports.value.findIndex(t => t._id === editingId.value)
      if (index !== -1) {
        transports.value[index] = { ...transports.value[index], ...form.value }
      }
    } else {
      // Add new transport
      const newTransport = {
        _id: Date.now().toString(),
        ...form.value,
        createdAt: new Date()
      }
      transports.value.push(newTransport)
    }
    
    closeModal()
  } catch (error) {
    console.error('Error saving transport:', error)
  } finally {
    loading.value = false
  }
}

const editTransport = (transport) => {
  form.value = { ...transport }
  editingId.value = transport._id
  showEditModal.value = true
}

const deleteTransport = async (id) => {
  if (confirm('هل أنت متأكد من حذف هذه وسيلة المواصلات؟')) {
    transports.value = transports.value.filter(t => t._id !== id)
  }
}

const closeModal = () => {
  showAddModal.value = false
  showEditModal.value = false
  editingId.value = null
  form.value = {
    name: '',
    type: '',
    description: '',
    price: 0,
    status: 'active',
    image: ''
  }
}

const resetFilters = () => {
  searchQuery.value = ''
  selectedType.value = ''
  selectedStatus.value = ''
}

const getTypeClass = (type) => {
  const classes = {
    bus: 'bg-blue-100 text-blue-800',
    taxi: 'bg-yellow-100 text-yellow-800',
    train: 'bg-green-100 text-green-800',
    plane: 'bg-purple-100 text-purple-800'
  }
  return classes[type] || 'bg-gray-100 text-gray-800'
}

const getTypeLabel = (type) => {
  const labels = {
    bus: 'حافلة',
    taxi: 'تاكسي',
    train: 'قطار',
    plane: 'طائرة'
  }
  return labels[type] || type
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('ar-EG')
}

// Lifecycle
onMounted(() => {
  fetchTransports()
})
</script>