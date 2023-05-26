<template>
    <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="上级" prop="roleParentId">
                <el-cascader :options="treelist" v-model="parentid" :props="{ checkStrictly: true }" clearable
                    @change="Level"></el-cascader>
            </el-form-item>
            <el-form-item label="角色名称" prop="roleName">
                <el-input v-model="ruleForm.roleName"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import { CreateRole, GetRoleTree } from "@/api/role"
export default {
    name: 'APP',
    data() {
        return {
            parentid: "",
            treelist: [],
            ruleForm: {
                roleName: '',
                roleParentId: 0,
            },
            rules: {
                roleName: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let index = this.parentid.length;

                    this.ruleForm.roleParentId = this.parentid[index - 1];
                    CreateRole(this.ruleForm).then(d => {
                        if (d.result == 200) {
                            this.$message.success(d.message);
                            setTimeout(() => {
                                this.$emit("dialogFormVisible", false)
                            }, 1000);
                        } else {
                            this.$message.error(d.message);
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
        },
        GetRoleTree() {
            GetRoleTree().then(d => {
                this.treelist = d.data;
            })
        },
        Level(val) {
            console.log(val)
        }
    },
    created() {
        this.GetRoleTree();
    },
    mounted() {
    },
}
</script>
<style lang="scss" scoped></style>
