<template>
  <a-row>
    <a-col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 2 }">
      <div>
        <a-input-search
          v-model:value="value"
          placeholder="input search text"
          enter-button
          @search="onSearch"
        />
      </div>
    </a-col>
    <a-col :xs="{ span: 11, offset: 1 }" :lg="{ span: 6, offset: 2 }">
      <div :style="{ borderBottom: '1px solid #E9E9E9' }">
        <a-checkbox
          v-model:checked="checkAll"
          :indeterminate="indeterminate"
          @change="onCheckAllChange"
        >
          Check all
        </a-checkbox>
      </div>
      <br />
      <a-checkbox-group
        v-model:value="checkedList"
        :options="plainOptions"
        @change="onChange"
      />
    </a-col>
    <a-col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 2 }">
      <div>
        <a-select
          v-model:value="value1"
          style="width: 120px"
          @focus="focus"
          ref="select"
          @change="handleChange1"
        >
          <a-select-option value="jack">
            Jack
          </a-select-option>
          <a-select-option value="lucy">
            Lucy
          </a-select-option>
          <a-select-option value="disabled" disabled>
            Disabled
          </a-select-option>
          <a-select-option value="Yiminghe">
            yiminghe
          </a-select-option>
        </a-select>
        <a-select v-model:value="value2" style="width: 120px" disabled>
          <a-select-option value="lucy">
            Lucy
          </a-select-option>
        </a-select>
        <a-select v-model:value="value3" style="width: 120px" loading>
          <a-select-option value="lucy">
            Lucy
          </a-select-option>
        </a-select>
      </div>
    </a-col>
  </a-row>

  <a-row style="margin-top: 10px">
    <div class="clearfix">
      <a-upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        list-type="picture-card"
        :file-list="fileList"
        @preview="handlePreview"
        @change="handleChange"
      >
        <div v-if="fileList.length < 8">
          <plus-outlined />
          <div class="ant-upload-text">Upload</div>
        </div>
      </a-upload>
      <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
        <img alt="example" style="width: 100%" :src="previewImage" />
      </a-modal>
    </div>
  </a-row>

  <a-row>
    <a-range-picker v-model:value="value4">
      <template v-slot:dateRender="{ current }">
        <div class="ant-calendar-date" :style="getCurrentStyle(current)">
          {{ current.date() }}
        </div>
      </template>
    </a-range-picker>
  </a-row>

  <a-row>
    <a-skeleton active />
  </a-row>
  <a-row>
    <div class="example">
      <a-spin />
    </div>
  </a-row>
  <a-row>
    <h1>
      {{ $t("message.good", {}, { locale: "ja" }) }} test
      <br />
      {{ $t("message.bad", {}, { locale: "en" }) }} test
      <br />
      {{ $t("menu.ok", {}, { locale: "en" }) }}
    </h1>
  </a-row>
  <a-row>
    <a-alert
      v-if="visible"
      message="Alert Message Text"
      type="success"
      closable
      :after-close="handleClose"
    />
  </a-row>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
import { PlusOutlined } from "@ant-design/icons-vue";
const plainOptions = ["Apple", "Pear", "Orange"];

function getBase64(file: any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default defineComponent({
  setup() {
    const count = ref(0);

    return {
      count
    };
  },
  components: {
    PlusOutlined
  },
  data() {
    //   window.test = this;
    return {
      visible: true,
      value1: "lucy",
      value2: "lucy",
      value3: "lucy",
      value4: null,
      checkedList: ["Apple", "Orange"],
      indeterminate: true,
      checkAll: false,
      plainOptions,
      value: "abelit",
      previewVisible: false,
      previewImage: "",
      fileList: [
        {
          uid: "-1",
          name: "image.png",
          status: "done",
          url:
            "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        },
        {
          uid: "-2",
          name: "image.png",
          status: "done",
          url:
            "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        },
        {
          uid: "-3",
          name: "image.png",
          status: "done",
          url:
            "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        },
        {
          uid: "-4",
          name: "image.png",
          status: "done",
          url:
            "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        },
        {
          uid: "-5",
          name: "image.png",
          status: "error"
        }
      ]
    };
  },
  methods: {
    handleCancel() {
      this.previewVisible = false;
    },
    async handlePreview(file: any) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    handleChange({ fileList }: any) {
      this.fileList = fileList;
    },
    onChange(checkedList: any) {
      this.indeterminate =
        !!checkedList.length && checkedList.length < plainOptions.length;
      this.checkAll = checkedList.length === plainOptions.length;
    },
    onCheckAllChange(e: any) {
      Object.assign(this, {
        checkedList: e.target.checked ? plainOptions : [],
        indeterminate: false
      });
    },
    focus() {
      console.log("focus");
    },
    handleChange1(value: any) {
      console.log(`selected ${value}`);
    },
    getCurrentStyle(current: any, today: any) {
      const style = {
        border: "",
        borderRadius: ""
      };
      if (current.date() === 1) {
        style.border = "1px solid #1890ff";
        style.borderRadius = "50%";
      }
      return style;
    },
    handleClose() {
      this.visible = false;
    }
  }
});
</script>

<style scoped>
.example {
  text-align: center;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  margin-bottom: 20px;
  padding: 30px 50px;
  margin: 20px 0;
}
</style>
