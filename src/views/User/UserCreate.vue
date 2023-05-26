<template>
    <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-row :gutter="24">
                <el-col :span="12" :offset="0">
                    <el-form-item label="用户名" prop="userName">
                        <el-input v-model="ruleForm.userName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12" :offset="0">
                    <el-form-item label="邮箱" prop="userEmail">
                        <el-input v-model="ruleForm.userEmail"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="12" :offset="0">
                    <el-form-item label="密码" prop="userPasswrod">
                        <el-input v-model="ruleForm.userPasswrod"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12" :offset="0">
                    <el-form-item label="确认密码" prop="userPasswrods">
                        <el-input v-model="ruleForm.userPasswrods"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row :gutter="24">
                <el-col :span="12" :offset="0">
                    <el-form-item label="状态" prop="userState">
                        <el-radio-group v-model="ruleForm.userState">
                            <el-radio :label="true">启用</el-radio>
                            <el-radio :label="false">禁用</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-col :span="12" :offset="0">
                    <el-form-item label="角色" prop="roleParentId">
                        <el-cascader :options="treelist" v-model="parentid" :props="{ checkStrictly: true }"
                            clearable></el-cascader>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="12" :offset="0">
                    <el-form-item label="头像" prop="roleParentId">
                        <el-upload class="avatar-uploader" action="http://localhost:5000/api/File/ImgUp"
                            :show-file-list="false" :on-success="handleAvatarSuccess">
                            <img v-if="ruleForm.userImg" :src="'http://localhost:5000/img/' + ruleForm.userImg"
                                class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                </el-col>
                <el-col :span="12" :offset="0">

                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="24" :offset="0">
                    <div style="border: 1px solid #ccc;width: 100%;height: 200px;;">
                        <Toolbar style="border-bottom: 1px solid #ccc" :editor="editor" :defaultConfig="toolbarConfig"
                            :mode="mode" />
                        <Editor style="height: 500px; overflow-y: hidden;" v-model="ruleForm.userDesc"
                            :defaultConfig="editorConfig" :mode="mode" @onCreated="onCreated" />
                    </div>
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
import { GetRoleTree } from "@/api/role";
import { CreateUserAsync } from "@/api/admin";
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
import Vue from 'vue'
export default Vue.extend({
    components: { Editor, Toolbar },
    name: 'APP',
    data() {
        return {
            //富文本编译器变量
            editor: null,
            toolbarConfig: {},
            editorConfig: { placeholder: '请输入内容...' },
            mode: 'default', // or 'simple'


            treelist: [],
            parentid: "",
            ruleForm: {
                userName: '',
                userEmail: '',
                userPasswrod: '',
                userPasswrods: '',
                userState: '',
                userImg: "",
                userDesc: "",
            },
            // rules: {
            //     name: [
            //         { required: true, message: '请输入活动名称', trigger: 'blur' },
            //         { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            //     ],
            //     region: [
            //         { required: true, message: '请选择活动区域', trigger: 'change' }
            //     ],
            //     resource: [
            //         { required: true, message: '请选择活动资源', trigger: 'change' }
            //     ]
            // }
        }
    },
    methods: {
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        handleAvatarSuccess(res, file) {
            console.log(res.message)
            if (res.result != 200) {
                this.$message.error(res.message);
                return;
            }
            this.ruleForm.userImg = res.message;
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    CreateUserAsync(this.ruleForm).then(d => {
                        if (d.result == 200) {
                            this.$message.success(d.message)
                        } else if (d.result == 100) {
                            this.$message.warning(d.message);
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
        GetRoleTree() {
            GetRoleTree().then(d => {
                this.treelist = d.data;
            })
        },
        onCreated(editor) {
            this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
        },
    },
    created() {
        this.GetRoleTree();
    },
    mounted() {

    },
    beforeDestroy() {
        const editor = this.editor
        if (editor == null) return
        editor.destroy() // 组件销毁时，及时销毁编辑器
    }
})
</script>
<style src="@wangeditor/editor/dist/css/style.css"></style>
<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 80px;
    height: 80px;
    line-height: 80px;
    text-align: center;
}

.avatar {
    width: 80px;
    height: 80px;
    display: block;
}
</style>
