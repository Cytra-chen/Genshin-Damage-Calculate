<template>
  <div>
    <div style="margin-left: 25%; margin-right: 25%">
      <div style="width: 100%; text-align: center">
        <!-- <img id="pic" src="../assets/p1.png" /> -->
        <el-row />
        <span style="font-size: 30px">原神伤害计算器</span>
        <el-row />
      </div>
      <el-form
        ref="form"
        :model="form"
        size="mini"
        :rules="rules"
        :disabled="readOnly"
      >
        <el-divider content-position="left">人物信息</el-divider>
        <!-- 后面改人物下拉和等级选择 -->
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="基础攻击">
              <el-input
                v-model="form.character.CON"
                placeholder="请输入基础攻击力"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="攻击百分比">
              <el-input
                v-model="form.character.atk_per"
                placeholder="请输入攻击力百分比"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="元素伤害">
              <el-input
                v-model="form.character.spAtk"
                placeholder="请输入元素伤害/物理伤害百分比"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="暴击率">
              <el-input
                v-model="form.character.criticalChance"
                placeholder="请输入暴击率"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="暴击伤害">
              <el-input
                v-model="form.character.criticalDamage"
                placeholder="请输入暴击伤害"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-divider content-position="left">武器信息</el-divider>
        <!-- 后面改武器下拉和等级选择 -->
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="基础攻击">
              <el-input
                v-model="form.weapon.CON"
                placeholder="请输入基础攻击力"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="攻击百分比">
              <el-input
                v-model="form.weapon.atk_per"
                placeholder="请输入攻击力百分比"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="元素伤害">
              <el-input
                v-model="form.weapon.spAtk"
                placeholder="请输入元素伤害/物理伤害百分比"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="暴击率">
              <el-input
                v-model="form.weapon.criticalChance"
                placeholder="请输入暴击率"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="暴击伤害">
              <el-input
                v-model="form.weapon.criticalDamage"
                placeholder="请输入暴击伤害"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="武器技能">
              <el-input
                v-model="form.weapon.special"
                placeholder="请输入武器技能"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-divider content-position="left">圣遗物信息</el-divider>
        <div v-for="item in form.equip" :key="item.key" class="member-form">
          <div class="memberMain">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="攻击百分比">
                  <el-input
                    v-model="form.weapon.atk_per"
                    placeholder="请输入攻击力百分比"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="元素伤害">
                  <el-input
                    v-model="form.weapon.spAtk"
                    placeholder="请输入元素伤害/物理伤害百分比"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="暴击率">
                  <el-input
                    v-model="form.weapon.criticalChance"
                    placeholder="请输入暴击率"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="暴击伤害">
                  <el-input
                    v-model="form.weapon.criticalDamage"
                    placeholder="请输入暴击伤害"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-button
              v-show="!readOnly"
              @click.prevent="removeDomain(item)"
              type="danger"
              size="mini"
              icon="el-icon-delete"
              plain
              style="position: absolute; right: 0; top: -34px"
            ></el-button>
          </div>
        </div>

        <el-row v-show="!readOnly" type="flex" justify="center">
          <el-form-item>
            <el-button
              @click="addDomain"
              type="primary"
              size="mini"
              v-show="!readOnly"
              >新增成员</el-button
            >
          </el-form-item>
        </el-row>
      </el-form>
      <div v-if="!readOnly" style="height: 50px" />
      <el-row type="flex" justify="center">
        <el-button
          type="primary"
          v-show="!readOnly"
          size="mini"
          @click="onSubmit"
          >提交</el-button
        >
        <el-button type="primary" v-show="!readOnly" size="mini" @click="onSave"
          >暂存</el-button
        >
        <el-button size="mini" @click="goBack">返回</el-button>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  name: 'demageCal',
  computed: {},
  mounted() {},
  data() {
    return {
      form: {
        character: {},
        weapon: {},
        equip: [],
        suit_one: {},
        suit_two: {}
      }
    }
  },
  methods: {
    onSubmit() {
      let newData = this.dealData()
      this.submitForm(newData)
      window.localStorage.removeItem('TS')
      window.localStorage.removeItem('TSdata')
    },
    onSave() {
      let newData = this.dealData()
      window.localStorage.setItem('TSdata', JSON.stringify(newData))
      window.localStorage.setItem('TS', 1)
      let that = this
      this.$alert('暂存成功', '暂存成功', {
        confirmButtonText: '确定',
        callback: (action) => {
          this.$router.push('./')
        }
      })
    },
    goBack() {
      this.$router.push('./')
    },
    initData() {
      let choose = window.localStorage.getItem('select')
      if (choose > -1) {
        this.readOnly = true
        this.form = JSON.parse(window.localStorage.getItem('data'))
        this.form.members = JSON.parse(this.form.members)
        if (
          !(
            (this.form.projectType == '内部管理') |
            (this.form.projectType == '项目履约') |
            (this.form.projectType == '工程技术') |
            (this.form.projectType == '信息化数字化') |
            (this.form.projectType == '国际化发展')
          )
        ) {
          this.projectTypeOther = this.form.projectType
          this.form.projectType = '其他'
        }
        this.form.description = this.form.ext1
        this.fileToken = JSON.parse(this.form.ext2)
        this.fileList = this.fileToken
        return
      }
      choose = window.localStorage.getItem('TS')
      if (choose) {
        this.form = JSON.parse(window.localStorage.getItem('TSdata'))
        this.form.members = JSON.parse(this.form.members)
        if (
          !(
            (this.form.projectType == '内部管理') |
            (this.form.projectType == '项目履约') |
            (this.form.projectType == '工程技术') |
            (this.form.projectType == '信息化数字化') |
            (this.form.projectType == '国际化发展')
          )
        ) {
          this.projectTypeOther = this.form.projectType
          this.form.projectType = '其他'
        }
        this.form.description = this.form.ext1
        this.fileToken = JSON.parse(this.form.ext2)
        this.fileList = this.fileToken
        return
      }
    },
    dealData() {
      let newData = { ...this.form }
      if (newData.projectType == '其他') {
        newData.projectType = this.projectTypeOther
      }
      newData.members = JSON.stringify(newData.members)
      newData.userName = this.name
      newData.ext1 = newData.description
      newData.ext2 = JSON.stringify(this.fileToken)
      return newData
    },
    submitForm(newData) {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          //ajax提交后台，数据为form
          submitForm(newData).then((res) => {
            if (res.data.status == 'success') {
              this.$alert('已收录报名数据', '提交成功', {
                confirmButtonText: '确定',
                callback: (action) => {
                  this.$router.push('./')
                }
              })
            } else {
              this.$alert('网络原因，提交失败', '提交失败', {
                confirmButtonText: '关闭'
              })
            }
          })
        } else {
          this.$alert('有必填项未填写', '提交失败', {
            confirmButtonText: '关闭'
          })
          return false
        }
      })
    },
    uploadFileSuccess(response, file, fileList) {
      let obj = {
        fileId: response.fileId,
        name: file.name
      }
      this.fileToken.push(obj)
      console.log(response.fileId)

      console.log(this.fileToken)
    },
    removeDomain(item) {
      var index = this.form.equip.indexOf(item)
      if (index !== -1) {
        this.form.equip.splice(index, 1)
      }
    },
    addDomain() {
      this.form.equip.push({})
    }
  },
  watch: {}
}
</script>

 
<style>
.member-form {
  border: 1px dashed;
  border-color: #a2a2a2;
  border-radius: 4px;
  margin-top: 20px;
  margin-left: -20px;
  margin-right: -20px;
  margin-bottom: 20px;
}
.memberMain {
  position: relative;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 20px;
  margin-right: 20px;
}
.upload-demo {
  position: relative;
  top: 0;
}
#pic {
  margin: 0 auto;
  width: 100%;
  padding: 0;
}
.msgBox {
  width: 60%;
}
.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>