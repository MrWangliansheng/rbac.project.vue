<template>
    <div style="width: 400px;margin: 0 auto;margin-top: 10%;">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pwd">
                <el-input v-model="ruleForm.pwd"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                <el-button @click="resetForm('ruleForm')">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    name: 'APP',
    data() {
        return {
            ruleForm: {
                name: '',
                pwd: '',
                code: "",
            },
            rules: {
                name: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                pwd: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.axios.post("/User/UserLog", this.ruleForm).then(d => {
                        if (d.data.message == "登陆成功") {
                            this.$message.success("登陆成功");
                            this.$router.push({
                                path: '/Index'
                            })
                        } else {
                            this.$message.error("用户名或密码错误或用户不存在");
                        }
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    },
    created() {
    },
    mounted() {
    },
}
</script>
<style lang="scss" scoped></style>
