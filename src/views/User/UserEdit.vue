<template>
    <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-row :gutter="24">
                <el-col :span="8">
                    <el-form-item label="用户名" prop="userName">
                        <el-input v-model="ruleForm.userName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="9">
                    <el-form-item label="邮箱" prop="userEmail">
                        <el-input v-model="ruleForm.userEmail"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item label="真实姓名" prop="pullName">
                        <el-input v-model="ruleForm.pullName"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item>
                <el-button type="primary" @click="UpdateUser('ruleForm')">立即创建</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import axios from "@/utils/request";
import { UpdateUser } from "@/api/admin"
export default {
    props: {
        id: Number
    },
    name: 'APP',
    data() {
        return {
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
        }
    },
    methods: {
        EditUser(id) {
            debugger
            console.log(id);
            axios({
                method: "get",
                url: "/User/EditUser?id=" + id
            }).then(d => {
                console.log(d)
                this.ruleForm = d.data;
            })
        },
        //修改用户信息
        UpdateUser(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    UpdateUser(this.ruleForm).then(d => {
                        if (d.result == 200) {
                            this.$message.success(d.message);
                            setTimeout(() => {
                                this.$emit("dialogFormVisible", false)
                            }, 1000)

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
    },
    created() {
        this.EditUser(this.id);
    },
    mounted() {
    },
}
</script>
<style lang="scss" scoped></style>
