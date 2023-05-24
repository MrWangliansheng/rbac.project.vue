<template>
    <div class="loginMain">
        <el-row class="login">
            <el-col :span="8" :offset="8">
                <el-card class="loginForm">
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
                            <el-col :span="12">
                                <el-input v-model="ruleForm.code"></el-input>
                            </el-col>
                            <el-col :span="8" :offset="2">

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
            },
            rules: {
                name: [{ required: true, message: "请输x入用户名", trigger: "blur" }],
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
                        if (d.message == "登陆成功") {
                            this.$message.success("登陆成功");
                            this.$router.push({
                                path: "/Index",
                            });
                        } else {
                            this.$message.error("用户名或密码错误或用户不存在");
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
    },
    created() { },
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
