<template>
    <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-row :gutter="20">
                <el-col :span="12" :offset="0">
                    <el-form-item label="上级" prop="roleParentId">
                        <el-cascader :options="treelist" v-model="ruleForm.roleParentId" :props="{ checkStrictly: true }"
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
                    <el-form-item label="权限菜单" prop="powerIds">
                        <el-cascader :options="prowlist" style="width: 100%;" v-model="ruleForm.powerIds" @change="GetValue"
                            :show-all-levels="false" :props="{ multiple: true, checkStrictly: true }"
                            clearable></el-cascader>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即修改</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import { UpdateRole, GetRoleTree, RoleEdit } from "@/api/role"
import { GetPowerTree } from "@/api/power";
export default {
    props: {
        id: Number
    },
    name: 'APP',
    data() {
        return {
            parentid: "",
            treelist: [],
            prowlist: [],
            ruleForm: {
                roleName: '',
                roleParentId: [],
                roleParentIdAll: '',
                powerId: [],
                powerIds: [],
                powerIdAll: [],
            },
            rules: {
                roleName: [
                    { required: true, message: '请输入角色名称', trigger: 'blur' }
                ],
                powerIds: [
                    { required: true, message: '请选择权限菜单', trigger: 'change' }
                ]
            }
        }
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let index = this.ruleForm.roleParentId.length;
                    if (index != 0) {
                        this.ruleForm.roleParentIdAll = this.ruleForm.roleParentId.toString();
                        this.ruleForm.roleParentId = this.ruleForm.roleParentId[index - 1];
                    } else {
                        this.ruleForm.roleParentId = 0;
                    }
                    UpdateRole(this.ruleForm).then(d => {
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
            val.forEach(item => {
                let index = item.length;
                this.ruleForm.powerId.push(item[index - 1]);
                this.ruleForm.powerIdAll.push(item.toString());
            })
            console.log(this.ruleForm.powerId)
        },
        Edit() {
            RoleEdit(this.id).then(d => {
                console.log(d.data);
                this.ruleForm = d.data;
                this.ruleForm.roleParentId = [];
                this.ruleForm.powerIds = [];
                // console.log(d.data.roleParentIdAll.split(","))
                if (d.data.roleParentIdAll != null) {
                    d.data.roleParentIdAll.split(",").forEach(item => {
                        this.ruleForm.roleParentId.push(Number(item));
                    })
                }

                d.data.powerIdAll.forEach(item => {
                    this.ruleForm.powerIds.push(item.split(","))
                })
            })
        }
    },
    created() {
        this.GetRoleTree();
        this.GetPowerTreeList();
        this.Edit();
    },
    mounted() {
    },
}
</script>
<style>
.el-cascader-panel {
    height: 200px;
}
</style>
