terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  required_version = ">= 1.2.0"

}

data "aws_eip" "my_instance_eip" {
  public_ip = "35.167.42.55"
}

# Definindo o id do grupo de segurança web
data "aws_security_group" "web" {
  id ="sg-07f86986595acfaee"
}

# Definindo o id do grupo de segurança ssh
data "aws_security_group" "ssh" {
  id ="sg-093f93e0c3ae95d15"
}

# Definindo o provedor
provider "aws" {
  region  = "us-west-2"
}

# Associando o Elastic IP
resource "aws_eip_association" "eip_assoc" {
  instance_id   = aws_instance.app_server.id
  allocation_id = data.aws_eip.my_instance_eip.id
}

# Criando instância
resource "aws_instance" "app_server" {
  ami           = "ami-0efcece6bed30fd98"
  instance_type = "t2.micro"
  key_name = "ec2"
  vpc_security_group_ids = [data.aws_security_group.ssh.id, data.aws_security_group.web.id]

  tags = {
    Name = "neflix backend terraform ansible"
  }
}