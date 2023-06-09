<template>
    <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-row :gutter="20">
                <el-col :span="12" :offset="0">
                    <el-form-item label="上级" prop="roleParentId">
                        <el-cascader :options="treelist" v-model="parentid" :props="{ checkStrictly: true }"
                            clearable></el-cascader>
                    </el-form-item>
                </el-col>
                <el-col :span="12" :offset="0">
                    <el-form-item label="角色名称" prop="roleName">
                        <el-input v-model="ruleForm.roleName"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="24" :offset="0">
                    <el-form-item label="权限菜单" prop="powerId">
                        <el-cascader :options="prowlist" @change="GetValue" :show-all-levels="false"
                            :props="{ multiple: true, checkStrictly: true }" clearable></el-cascader>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import { CreateRole, GetRoleTree } from "@/api/role"
import { GetPowerTree } from "@/api/power";
export default {
    name: 'APP',
    data() {
        return {
            parentid: "",
            treelist: [],
            prowlist: [],
            ruleForm: {
                roleName: '',
                roleParentId: 0,
                roleParentIdAll: '',
                powerId: [],
                powerIdAll: [],
            },
            rules: {
                roleName: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' }
                ],
                powerId: [
                    { required: true, message: '请选择权限菜单', trigger: 'change' }
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
                    this.ruleForm.roleParentIdAll = this.parentid.toString();
                    CreateRole(this.ruleForm).then(d => {
                        if (d.result == 200) {
                            this.$message.success(d.message);
                            setTimeout(() => {
                                this.$emit("dialogFormVisible", false)
                            }, 1000);
                        } else if (d.result == 100) {
                            this.$message.warning(d.message);
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
        GetPowerTreeList() {
            GetPowerTree().then(d => {
                this.prowlist = d.data;
            })
        },
        GetValue(val) {
            this.ruleForm.powerId = [];
            this.ruleForm.powerIdAll = [];
            // console.log(val)
            val.forEach(item => {
                let index = item.length;
                this.ruleForm.powerId.push(item[index - 1]);
                this.ruleForm.powerIdAll.push(item.toString());
            })
        },
    },
    created() {
        this.GetRoleTree();
        this.GetPowerTreeList();
    },
    mounted() {
    },
}
</script>
<style>
.el-cascader-panel {
    height: 100px;
}
</style>
