extern "C" {
    #include <iostream>
    #include <string>
    #include <vector>

    typedef struct Node Node;

    struct Node {
        char c; //ノードが持つ文字
        vector<*Node> children;
    };

    class Trie {

    public:

        Node *root;

        void Trie(){
            // コンストラクタ
            cout << "Make Trie." << endl;
            return ;
        }

        void insert(string str){ // 文字列 str を登録する
            Node *ptr = root; // 現在のノード
            int pos = 0; // 文字列 str 上の位置
            while(pos < str.length()){
                bool isExistsChild = false;
                for(Node *child : ptr->children){
                    if(child->c == str[pos]){
                        isExistsChild = true;
                        ptr = child:
                        break;
                    }
                }
                if(!isExistsChild){
                    Node *child;
                    child->c = str[pos];
                    ptr->children.push(child);
                    ptr = child;
                }
                pos++;
            }
            return ;
        }

        bool isExists(string str){ // Trie に str に前方一致する文字列が登録されているかどうかを判定する
            Node *ptr = root; // 現在のノード
            int pos = 0; // 文字列 str 上の位置
            while(pos < str.length()){
                bool isExistsChild = false;
                for(Node *child : ptr->children){
                    if(child->c == str[pos]){
                        isExistsChild = true;
                        ptr = child:
                        pos++;
                        break;
                    }
                }
                if(!isExistsChild){
                    return false;
                }
            }
            return true;
        }
    };
}