import React from "react";
import AtlasBackdrop from "../../../components/Util/AtlasBackdrop";
import { AppInfoLayout } from "../../styles";
import Roadmap from "../Roadmap";
import { RoadmapItemType } from "@hefesto/types";

interface Props {
  isOpen: boolean;
  handleCloseFn: (open: boolean) => void;
}

const roadmapItems: RoadmapItemType[] = [
  {
    complete: true,
    label: "Visualização, criação, atualização e exclusão de itens",
  },
  { complete: true, label: "Sistema de blog" },
  {
    complete: true,
    label:
      "Sistema de otimização de imagens para formatos modernos com compressão sem perda",
  },
  { complete: true, label: "Armazenamento de imagens em nuvem" },

  {
    complete: true,
    label:
      "Serialização de valores inseridos no momento da criação para serem processados pela aplicação pública",
  },
  {
    complete: true,
    label:
      "Interface de função para executar sincronização de dados com a aplicação pública",
  },

  {
    complete: true,
    label:
      "Sistema de autenticação para proteger dados do painel através de um LOGIN",
  },

  {
    complete: false,
    label: "Seção de configurações (opcional)",
  },

  {
    complete: false,
    label: "Modo noturno para facilitar trabalho noturno (opcional)",
  },

  {
    complete: false,
    label: "Habilidade de atualizar perfil do usuário",
  },
];

const AppInfo = ({ handleCloseFn, isOpen }: Props) => {
  return (
    <AtlasBackdrop
      closeFn={handleCloseFn}
      onClose={handleCloseFn}
      open={isOpen}
    >
      <AppInfoLayout>
        <Roadmap items={roadmapItems} />
      </AppInfoLayout>
    </AtlasBackdrop>
  );
};

export default AppInfo;
