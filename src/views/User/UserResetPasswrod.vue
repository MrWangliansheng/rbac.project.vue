<template>
    <div>
        <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-row :gutter="24">
                <el-col>
                    <el-form-item label="密码:" prop="pwd">
                        <el-input show-password v-model="ruleForm.pwd"></el-input>
                        <span style="color: red;">*默认密码为123456</span>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item>
                <el-button type="primary" @click="ResetUserPasswrod('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import { ResetPasswrod } from "@/api/admin"
export default {
    name: 'APP',
    props: {
        id: Number
    },
    data() {
        return {
            ruleForm: {
                id: this.id,
                pwd: '',
            }
        }
    },
    methods: {

        //重置用户密码
        ResetUserPasswrod() {

            console.log(this.ruleForm);
            this.$confirm('确定提交操作吗？若未输入重置密码默认为123456, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                if (this.ruleForm.pwd == "") {
                    this.ruleForm.pwd = "123456";
                }
                ResetPasswrod(this.ruleForm).then(d => {
                    if (d.result == 200) {
                        this.$message.success(d.message);
                        setTimeout(() => {
                            this.$emit("ResetPasswrod", false)
                        }, 1000)
                    } else {
                        this.$message.error(d.message);
                    }
                })
            }).catch((err) => {
                console.log(err)
                this.$message({
                    type: 'info',
                    message: '已取消操作'
                });
            });
        },
    },
    created() {

    },
    mounted() {
    },
}
</script>
<style lang="scss" scoped></style>
