<template>
    <div class="loginMain">
        <el-row class="login">
            <el-col :span="8" :offset="8">
                <el-card class="loginForm" style="background-color: transparent !important">
                    <div slot="header" class="clearfix">
                        <span>用户登录</span>
                    </div>
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="用户名" prop="name">
                            <el-input v-model="ruleForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="pwd">
                            <el-input v-model="ruleForm.pwd" show-password></el-input>
                        </el-form-item>
                        <el-form-item label="验证码" prop="code">
                            <el-col :span="24">
                                <el-input v-model="ruleForm.code">
                                    <template slot="append"> <img id="Code" width="60" height="35px"
                                            style="margin-left: 5px;cursor: pointer;" @click="GetCode" title="看不清,换一张"
                                            :src="'http://localhost:5000/api/AuthCode/UserCode?guid=' + ruleForm.guid"
                                            alt="" />
                                    </template>
                                </el-input>
                            </el-col>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                            <el-button @click="resetForm('ruleForm')">重置</el-button>
                        </el-form-item>
                    </el-form>
                </el-card>
            </el-col>
        </el-row>

    </div>
</template>
<script>
import { UserLogin } from '../../api/admin'
export default {
    name: "RbacProjectUiLogin",
    data() {
        return {

            ruleForm: {
                name: "",
                pwd: "",
                code: "",
                guid: "",
            },
            rules: {
                name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
                pwd: [{ required: true, message: "请输入密码", trigger: "blur" }],
                code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
            },
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    UserLogin(this.ruleForm).then(d => {

                        if (d.result == 200) {
                            this.$message.success(d.message);
                            // localStorage.setItem("token", d.key)
                            this.$ls.set("token", d.key, 540000);
                            // this.$session.set("username", this.ruleForm.name)
                            // console.log(this.ruleForm.name);
                            // this.$session.get("username")
                            // console.log(this.$session.get("username"));
                            this.$router.push({
                                path: "/Index",
                            });
                        } else if (d.result == 100) {
                            this.$message.warning(d.message);
                        } else {
                            this.$message.error(d.message);
                        }
                    })
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        GUID() {
            return ((1 + Math.random()) * 0x100000 | 0).toString(16).substring(1);
        },
        GetGuid() {
            let guid = this.GUID() + "-" + this.GUID() + "-" + this.GUID() + "-" + this.GUID() + "-" + this.GUID();
            this.ruleForm.guid = guid;
        },
        GetCode() {
            let guid = this.GUID() + "-" + this.GUID() + "-" + this.GUID() + "-" + this.GUID() + "-" + this.GUID();
            this.ruleForm.guid = guid;
            document.getElementById("Code").src = "http://localhost:5000/api/AuthCode/UserCode?guid=" + this.ruleForm.guid;
        }
    },
    created() {
        this.GetGuid();
    },
    mounted() { },
};
</script>
<style>
.loginMain {
    height: 100%;
    background: url("../../assets/1.jpg");
    background-size: 100% auto;
    background-repeat: no-repeat;
}

.loginForm {
    margin: 0 auto;
    margin-top: 5em;
}



.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}
</style>
