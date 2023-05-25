<template>
  <div class="stuscou_Box">
    <div>
      <el-table border :data="userlist" style="width: 100%">
        <el-table-column prop="userName" label="登录名"></el-table-column>
        <el-table-column prop="userEmail" label="用户邮箱"></el-table-column>
        <el-table-column prop="pullName" label="用户真实姓名"></el-table-column>
        <el-table-column prop="lastLoginTime" label="最后登录时间">
          <template slot-scope="scope">
            {{ scope.row.lastLoginTime == null ? "" : scope.row.lastLoginTime.replace("T", " ") }}
          </template>
        </el-table-column>
        <el-table-column prop="lastLoginIP" label="最后登录IP"></el-table-column>
        <el-table-column prop="msgUpdateUser" label="最近修改人"></el-table-column>
        <el-table-column prop="lastLoginTime" label="最近修改时间">
          <template slot-scope="scope">
            {{ scope.row.megUpdateTipme == null ? "" : scope.row.megUpdateTipme.replace("T", " ") }}
          </template>
        </el-table-column>
        <el-table-column prop="megDeleteUser" label="删除人"></el-table-column>
        <el-table-column prop="msgDeleteTime" label="删除日期">
          <template slot-scope="scope">
            {{ scope.row.msgDeleteTime == null ? "" : scope.row.msgDeleteTime.replace("T", " ") }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="UserId = scope.row.userId, dialogFormVisible = true" type="text"
              size="small">修改信息</el-button>
            <el-button @click="ResetId = scope.row.userId, Reset = true" type="text" size="small">重置密码</el-button>
          </template>
        </el-table-column>
      </el-table>
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
  </div>
</template>
<script>
import { GetUserAll, EditUser } from '@/api/admin';
import UserEdit from "@/views/User/UserEdit.vue"
import UserResetPasswrod from "@/views/User/UserResetPasswrod.vue"
export default {
  components: {
    UserEdit,
    UserResetPasswrod
  },
  name: "APP",
  data() {
    return {
      userlist: [],
      //重置密码弹出层是否显示
      Reset: false,
      //修改用户信息弹出层是否显示
      dialogFormVisible: false,
      UserId: "",
      ResetId: "",
    };
  },
  methods: {
    GetUserList() {

      console.log(this.$route)
      GetUserAll().then(d => {
        this.userlist = d.data;
      })
    },
    Reload() {
      location.reload();
    },
    Visible(val) {
      this.dialogFormVisible = val;
      this.Reset = val;
      location.reload();
    }
  },
  created() {
    this.GetUserList();
  },
  mounted() { },
};
</script>
<style></style>
