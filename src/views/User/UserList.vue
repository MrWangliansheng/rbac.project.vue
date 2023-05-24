<template>
  <div class="stuscou_Box">
    <el-table :data="userlist" style="width: 100%">
      <el-table-column prop="userName" label="登录名"></el-table-column>
      <el-table-column prop="userEmail" label="用户邮箱"></el-table-column>
      <el-table-column prop="pullName" label="用户真实姓名"></el-table-column>
      <el-table-column prop="lastLoginTime" label="最后登录时间">
        <template slot-scope="scope">
          {{ scope.row.lastLoginTime == null ? "" : scope.row.lastLoginTime.replace("T", " ") }}
        </template>
      </el-table-column>
      <el-table-column prop="lastLoginIP" label="最后登录IP"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="dialogFormVisible = true, EditUser(scope.row.userId)" type="text"
            size="small">修改用户信息</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="width: 90%;">
      <el-dialog title="修改用户信息" :visible.sync="dialogFormVisible" :modal="false">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="用户名" prop="userName">
                <el-input v-model="ruleForm.userName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="邮箱" prop="userEmail">
                <el-input show-password v-model="ruleForm.userEmail"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="真实姓名" prop="pullName">
                <el-input show-password v-model="ruleForm.pullName"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { GetUserAll, EditUser } from '@/api/admin';
export default {
  name: "APP",
  data() {
    return {
      userlist: [],
      dialogFormVisible: false,
      ruleForm: {
        userName: '',
        userEmail: "",
        pullName: ""
      },
      rules: {
        userName: [
          { required: true, message: '请输入账号名', trigger: 'blur' }
        ],
        userEmail: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }
        ],
        pullName: [
          { required: true, message: '请输入真实姓名', trigger: 'blur' }
        ],
      }
    };
  },
  methods: {
    GetUserList() {
      GetUserAll().then(d => {
        this.userlist = d;
      })
    },
    EditUser(id) {
      console.log(id);
      EditUser().then(d => {
        this.ruleForm = d.data;
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {

        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  created() {
    this.GetUserList();
  },
  mounted() { },
};
</script>
<style></style>
