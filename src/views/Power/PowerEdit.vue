<template>
    <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-row :gutter="20">
                <el-col :span="12" :offset="0">
                    <el-form-item label="菜单图标" prop="powerIcon">
                        <e-icon-picker v-model="ruleForm.powerIcon"></e-icon-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="12" :offset="0">
                    <el-form-item label="上级菜单" prop="powerParentId">
                        <el-cascader :options="powerlist" v-model="ruleForm.powerParentId" :props="{ checkStrictly: true }"
                            clearable></el-cascader>
                        <!-- :show-all-levels="false" -->
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row :gutter="20">
                <el-col :span="12" :offset="0">
                    <el-form-item label="菜单名称" prop="powerName">
                        <el-input v-model="ruleForm.powerName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12" :offset="0">
                    <el-form-item label="权限路由" prop="powerRoute">
                        <el-input v-model="ruleForm.powerRoute"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12" :offset="0">
                    <el-form-item label="接口URL" prop="powerAPIUrl">
                        <el-input v-model="ruleForm.powerAPIUrl"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12" :offset="0">

                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12" :offset="0">
                    <el-form-item label="重定向路由" prop="powerRedirect">
                        <el-input v-model="ruleForm.powerRedirect"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12" :offset="0">
                    <el-form-item label="类型" prop="powerType">
                        <el-radio-group v-model="ruleForm.powerType">
                            <el-radio v-for="item in typelist" :key="item.id" :label="item.id" :value="item.id">
                                {{ item.name }}
                            </el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="24" :offset="0">
                    <el-form-item label="菜单描述" prop="powerDesc">
                        <el-input type="textarea" v-model="ruleForm.powerDesc"></el-input>
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
import { GetPowerTree, GetPowerEnum, EditPower, UpdatePower } from '@/api/power';
export default {
    props: {
        id: Number
    },
    name: 'APP',
    data() {
        return {
            typelist: [],
            powerlist: [],
            ruleForm: {
                powerName: '',
                powerRoute: '',
                powerParentId: "",
                powerType: "",
                powerDesc: "",
                powerParentIdAll: "",
                powerIcon: "",
                powerRedirect: "",
                powerAPIUrl: "",
            },
            rules: {
                powerName: [
                    { required: true, message: '请输入菜单名称', trigger: 'blur' }
                ],
                powerRoute: [
                    { required: true, message: '请输入菜单路由', trigger: 'blur' }
                ],
                powerRedirect: [
                    { required: true, message: '请输入重定向路由', trigger: 'blur' }
                ],
                powerType: [
                    { required: true, message: '请选择类型', trigger: 'change' }
                ],
                powerAPIUrl: [
                    { required: true, message: '请输入接口URL', trigger: 'blur' }
                ],
                powerDesc: [
                    { required: true, message: '请填写菜单描述', trigger: 'blur' }
                ],
                powerIcon: [
                    { required: true, message: '请选择图标', trigger: 'change' }
                ]
            }
        }
    },
    methods: {
        GetPowerTreeList() {
            GetPowerTree().then(d => {
                console.log(d.data)
                this.powerlist = d.data;
            })
        },
        GetValue(val) {
            var index = val.length;
            this.ruleForm.powerParentId = val[index - 1];
        },
        GetPowerEnumList() {
            GetPowerEnum().then(d => {
                this.typelist = d.data;
            })
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    var index = this.ruleForm.powerParentId.length;
                    this.ruleForm.powerParentIdAll = this.ruleForm.powerParentId.toString();
                    this.ruleForm.powerParentId = this.ruleForm.powerParentId == "" ? 0 : this.ruleForm.powerParentId[index - 1];
                    UpdatePower(this.ruleForm).then(d => {
                        if (d.result == 200) {
                            this.$message.success(d.message)
                            this.$emit("Update", false)
                        } else if (d.result == 100) {
                            this.$message.warning(d.message)
                        } else {
                            this.$message.error(d.message)
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
        Edit() {
            EditPower(this.id).then(d => {
                this.ruleForm = d.data;
                this.ruleForm.powerParentId = [];
                d.data.powerParentIdAll.split(",").forEach(item => {
                    this.ruleForm.powerParentId.push(Number(item))
                })
                console.log(d.data)
            })
        }
    },
    created() {
        this.GetPowerTreeList();
        this.GetPowerEnumList();
        this.Edit();
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
