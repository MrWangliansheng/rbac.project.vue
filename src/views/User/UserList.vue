<template>
  <div>
    <div>
      <el-form :inline="true" :model="page" class="demo-form-inline">
        <el-form-item>
          <el-input v-model="page.name" clearable placeholder="请输入用户名或账号"></el-input>
        </el-form-item>
        <el-form-item label="创建日期">
          <el-date-picker v-model="page.createstartime" type="date" placeholder="开始日期"></el-date-picker>
          ——
          <el-date-picker v-model="page.createendtime" type="date" placeholder="结束日期"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="page.pageindex = 1, GetUserList()">查询</el-button>
          <el-button type="success" @click="CreateVisible = true">添加</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div>
      <el-table border :data="userlist" style="width: 100%">
        <el-table-column prop="userName" label="登录名"></el-table-column>
        <el-table-column prop="userEmail" label="用户邮箱">
          <template slot-scope="scope">
            <el-popover trigger="click" placement="top" style="cursor: pointer">
              <p>{{ scope.row.userEmail }}</p>
              <div slot="reference" class="name-wrapper">
                {{ scope.row.userEmail.substring(0, 10) + "..." }}
              </div>
            </el-popover>

          </template>
        </el-table-column>
        <el-table-column prop="pullName" label="用户真实姓名"></el-table-column>
        <el-table-column prop="lastLoginTime" label="最后登录时间">
          <template slot-scope="scope">
            <el-popover trigger="click" placement="top" style="cursor: pointer">
              <p>{{ scope.row.lastLoginTime == null ? "" : scope.row.lastLoginTime.replace("T", " ") }}</p>
              <div slot="reference" class="name-wrapper">
                {{ scope.row.lastLoginTime == null ? "" : scope.row.lastLoginTime.substring(0, 10) }}
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="lastLoginIP" label="最后登录IP"></el-table-column>
        <el-table-column prop="msgUpdateUser" label="最近修改人"></el-table-column>
        <el-table-column prop="lastLoginTime" label="最近修改时间">
          <template slot-scope="scope">
            <el-popover trigger="click" placement="top" style="cursor: pointer">
              <p> {{ scope.row.megUpdateTipme == null ? "" : scope.row.megUpdateTipme.replace("T", " ") }}</p>
              <div slot="reference" class="name-wrapper">
                {{ scope.row.megUpdateTipme == null ? "" : scope.row.megUpdateTipme.substring(0, 10) }}
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="megDeleteUser" label="删除人"></el-table-column>
        <el-table-column prop="msgDeleteTime" label="删除日期">
          <template slot-scope="scope">
            <el-popover trigger="click" placement="top" style="cursor: pointer">
              <p> {{ scope.row.msgDeleteTime == null ? "" : scope.row.msgDeleteTime.replace("T", " ") }}</p>
              <div slot="reference" class="name-wrapper">
                {{ scope.row.msgDeleteTime == null ? "" : scope.row.msgDeleteTime.substring(0, 10) }}
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="UserId = scope.row.userId, dialogFormVisible = true" type="text"
              size="small">修改信息</el-button>
            <el-button @click="ResetId = scope.row.userId, Reset = true" type="text" size="small">重置密码</el-button>
            <el-button @click="LogicDeleteUser(scope.row.userId)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block" style="margin: 0 auto;width: 500px;">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page.pageindex"
        :page-sizes="[2, 4, 6, 8]" :page-size="page.pagesize" layout="total, sizes, prev, pager, next, jumper"
        :total="page.total">
      </el-pagination>
    </div>
    <div style="width: 90%;">
      <el-dialog title="修改用户信息" :visible.sync="dialogFormVisible" :modal="false">
        <UserEdit :id="UserId" :key="new Date().getTime()" @dialogFormVisible="Visible"></UserEdit>
      </el-dialog>
    </div>
    <div style="width: 90%;">
      <el-dialog title="重置用户密码" :visible.sync="Reset" :modal="false">
        <UserResetPasswrod :id="ResetId" :key="new Date().getTime()" @ResetPasswrod="Visible"></UserResetPasswrod>
      </el-dialog>
    </div>
    <div style="width: 90%;">
      <el-dialog title="用户添加" :visible.sync="CreateVisible" :modal="false">
        <UserCreate @Create="Visible"></UserCreate>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { GetUserInfoPage, EditUser, LogicDeleteUserAsync } from '@/api/admin';
import UserEdit from "@/views/User/UserEdit.vue"
import UserResetPasswrod from "@/views/User/UserResetPasswrod.vue"
import UserCreate from "@/views/User/UserCreate.vue"
export default {
  components: {
    UserEdit,
    UserResetPasswrod,
    UserCreate
  },
  name: "APP",
  data() {
    return {
      userlist: [],
      //重置密码弹出层是否显示
      Reset: false,
      //修改用户信息弹出层是否显示
      dialogFormVisible: false,
      //是否打开用户添加弹出层
      CreateVisible: false,
      UserId: "",
      ResetId: "",
      page: {
        pageindex: 1,
        pagesize: 2,
        total: 0,
        pagecount: 0,
      },
    };
  },
  methods: {
    GetUserList() {
      GetUserInfoPage(this.page).then(d => {
        this.userlist = d.data;
        this.page.total = d.total;
        this.page.pagecount = d.pagecount;
      })
    },
    Reload() {
      location.reload();
    },
    Visible(val) {
      this.dialogFormVisible = val;
      this.Reset = val;
      this.CreateVisible = val;
      location.reload();
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.page.pagesize = val;
      this.GetUserList();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page.pageindex = val;
      this.GetUserList();
    },
    LogicDeleteUser(id) {
      LogicDeleteUserAsync(id).then(d => {
        this.$message.success(d.message)
      })
    }
  },
  created() {
    this.GetUserList();
  },
  mounted() { },
};
</script>
<style>
.el-upload el-upload--picture-card {
  width: 80px;
  height: 80px;
}
</style>
